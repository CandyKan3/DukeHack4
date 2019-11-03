const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
var mysql = require("mysql");

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
      "SELECT us.id, loc.lat, loc.lng  FROM users us INNER JOIN location loc ON us.location=loc.location_id NATURAL LEFT JOIN assignment asgn WHERE asgn.assignment_id IS NULL and us.type='Rider'";
    con.query(sqlRider, [], function(err, riderResult) {
      if (err) throw err;
      var sqlDriver =
        "SELECT us.id, loc.lat, loc.lng FROM users us INNER JOIN location loc ON us.location=loc.location_id WHERE us.type='Driver' and us.driver_cap>1";
      con.query(sqlDriver, [], function(err, driverResult) {
        if (err) throw err;
        var eventSQL =
          "SELECT ev.event_id, loc.lat, loc.lng  from events ev INNER JOIN location loc ON ev.location=loc.location_id where event_id=1";
        con.query(sqlDriver, [], function(err, eventResult) {
          if (err) throw err;
          for (var i = 0; i < riderResult.length; i++) {
            var minDist = "X";
            var driverID = -1;
            for (var j = 0; j < driverResult.length; j++) {
              var dist = getDist(riderResult[i], driverResult[j], eventResult);
              console.log(JSON.stringify(eventResult[i]));
              if (minDist == "X" || dist < minDist) {
                minDist = dist;
                driverID = driverResult[j].id;
              } //Write Assignment statement here
              //console.log(driverID);
            }
          }
        });
      });
    });
  });
});

app.listen(3128);

function getDist(riderResult, driverResult, eventResult) {
  console.log(driverResult.lng + " " + driverResult.lat);
  console.log(eventResult.lng + " " + eventResult.lat);
  console.log(riderResult.lng + " " + riderResult.lat);
  var ydiff = Math.abs(driverResult.lng - eventResult.lng);
  var xdiff = Math.abs(driverResult.lat - eventResult.lat);
  return Math.abs(
    ydiff * riderResult.lat -
      xdiff * riderResult.lng +
      driverResult.lat * eventResult.lng -
      driverResult.lng * eventResult.lat
  ); // Math.sqrt(Math.pow(ydiff, 2) + Math.pow(xdiff, 2))
}
