const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
var mysql = require("mysql");
var twilio = require("twilio");

app = express();

cron.schedule("* * * * *", function() {
  var con = mysql.createConnection({
    host: "34.73.223.220",
    user: "hackduke",
    password: "oliver",
    database: "test"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sqlRider =
      "SELECT us.id, loc.lat, loc.lng, us.ph_number  FROM users us INNER JOIN location loc ON us.location=loc.location_id NATURAL LEFT JOIN assignment asgn WHERE asgn.assignment_id IS NULL and us.type='Rider'";
    con.query(sqlRider, [], function(err, riderResult) {
      if (err) throw err;
      var sqlDriver =
        "SELECT us.id, loc.lat, loc.lng, us.ph_number FROM users us INNER JOIN location loc ON us.location=loc.location_id WHERE us.type='Driver' and us.driver_cap>1";
      con.query(sqlDriver, [], function(err, driverResult) {
        if (err) throw err;
        var eventSQL =
          "SELECT ev.event_id, loc.lat, loc.lng  from events ev INNER JOIN location loc ON ev.location=loc.location_id where event_id=1";
        con.query(eventSQL, [], function(err, eventResult) {
          if (err) throw err;
          for (var i = 0; i < riderResult.length; i++) {
            var minDist = "X";
            var driverID = -1;
            var phNumDriver = 0;
            for (var j = 0; j < driverResult.length; j++) {
              var dist = getDist(
                riderResult[i],
                driverResult[j],
                eventResult[0]
              );
              console.log(dist);
              if (minDist == "X" || dist < minDist) {
                minDist = dist;
                driverID = driverResult[j].id;
                phNumDriver = driverResult[j].ph_number;
              }
            }
            var assgnSQL =
              "INSERT IGNORE into assignment (rider, driver, event) VALUES (?,?,?)";
            con.query(
              assgnSQL,
              [riderResult[i].id, driverID, eventResult[0].event_id],
              function(err, eventResult) {
                if (err) throw err;
                console.log("1 row inserted");
                var updateUsr =
                  "UPDATE users SET driver_cap=driver_cap-1 WHERE id=" +
                  driverID +
                  " and driver_cap > 0";
                con.query(updateUsr, [], function(err, eventResult) {
                  if (err) throw err;
                  console.log("1 row inserted");
                });
              }
            );
            sendMessage(
              "+17325079330",
              riderResult[i].ph_number,
              "You have been assigned a ride to your next event. Call your driver to make further arrangements"
            );
            sendMessage(
              "+17325079330",
              phNumDriver,
              "You have been assigned a rider on your way to the next event. Call your rider to make further arrangements"
            );
          }
        });
      });
    });
  });
});

app.listen(3128);

function getDist(riderResult, driverResult, eventResult) {
  //console.log(driverResult.lng + " " + driverResult.lat);
  //console.log(eventResult.lng + " " + eventResult.lat);
  //console.log(riderResult.lng + " " + riderResult.lat);
  var ydiff = Math.abs(driverResult.lng - eventResult.lng);
  var xdiff = Math.abs(driverResult.lat - eventResult.lat);
  return Math.abs(
    ydiff * riderResult.lat -
      xdiff * riderResult.lng +
      driverResult.lat * eventResult.lng -
      driverResult.lng * eventResult.lat
  ); // Math.sqrt(Math.pow(ydiff, 2) + Math.pow(xdiff, 2))
}

function sendMessage(sender, reciever, message) {
  const accountSid = "AC680b1c3c3269b9e6728e94d9bf24616b";
  const authToken = "6e7379408f802e5bf3ebf69e0ecf9b1a";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: message,
      from: sender,
      to: reciever
    })
    .then(message => console.log(message.sid));
}
