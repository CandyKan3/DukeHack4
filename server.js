var express = require("express");
var app = express();
var router = express.Router();
var mysql = require("mysql");
var Request = require("request");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());

const API_PORT = 5000;
const firebase = require("./database");

// Get homepage
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/getuser", function(req, res, next) {
  console.log(req.cookies.Cookie);
  res.send(req.cookies.Cookie);
});
router.get("/getuserid", function(req, res, next) {
  console.log(req.cookies.Cookie.test[0].id);
  let a = req.cookies.Cookie.test[0].id;
  let b = "";
  var con = mysql.createConnection({
    host: "34.73.223.220",
    user: "hackduke",
    password: "oliver",
    database: "test"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM assignment WHERE rider= ?";
    console.log(sql, a);
    con.query(sql, [a], function(err, result) {
      if (err) throw err;
      console.log(result[0]);
      a = result[0].driver;
      var sql = "SELECT * FROM users WHERE id= ?";
      console.log(sql, a);
      con.query(sql, [a], function(err, result) {
        if (err) throw err;
        console.log(result[0].location);
        res.send(result[0]);
      });
    });
  });
});

router.get("/getuserPassenger", function(req, res, next) {
  console.log(req.cookies.Cookie.test[0].id);
  let a = req.cookies.Cookie.test[0].id;
  let b = "";
  var con = mysql.createConnection({
    host: "34.73.223.220",
    user: "hackduke",
    password: "oliver",
    database: "test"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM assignment WHERE driver= ?";
    console.log(sql, a);
    con.query(sql, [a], function(err, result) {
      if (err) throw err;
      console.log(result[0]);
      var b = result[0].rider;
      var sql = "SELECT * FROM users WHERE id= ?";
      console.log(sql, b);
      con.query(sql, [b], function(err, result) {
        if (err) throw err;
        console.log(result[0].location);
        res.send(result[0]);
      });
    });
  });
});

router.get("/getuser2", function(req, res, next) {
  console.log(req.cookies.Cookie.test[0].id);
  let a = req.cookies.Cookie.test[0].id;
  let b = "";
  var con = mysql.createConnection({
    host: "34.73.223.220",
    user: "hackduke",
    password: "oliver",
    database: "test"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM assignment WHERE rider= ?";
    console.log(sql, a);
    con.query(sql, [a], function(err, result) {
      if (err) throw err;
      console.log(result[0]);
      a = result[0].driver;
      var sql = "SELECT * FROM users WHERE id= ?";
      console.log(sql, a);
      con.query(sql, [a], function(err, result) {
        if (err) throw err;
        console.log(result[0].location);
        let b = result[0].location;
        var sql = "SELECT * FROM location WHERE location_id= ?";
        console.log(sql, b);
        con.query(sql, [b], function(err, result) {
          if (err) throw err;
          console.log(result[0]);
          var sql =
            "SELECT ev.event_id, loc.lat, loc.lng  from events ev INNER JOIN location loc ON ev.location=loc.location_id where event_id=1";
          con.query(sql, [], function(err, result2) {
            if (err) throw err;
            console.log(result2[0]);
            var resJ = {};
            resJ.result1 = result[0];
            resJ.result2 = result2[0];
            res.send(resJ);
          });
        });
      });
      console.log("cooking");
    });
  });
});

router.get("/getuser3", function(req, res, next) {
  console.log(req.cookies.Cookie.test[0].id);
  let a = req.cookies.Cookie.test[0].id;
  let b = "";
  var con = mysql.createConnection({
    host: "34.73.223.220",
    user: "hackduke",
    password: "oliver",
    database: "test"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM assignment WHERE driver= ?";
    console.log(sql, a);
    con.query(sql, [a], function(err, result) {
      if (err) throw err;
      console.log(result[0]);
      a = result[0].driver;
      var sql = "SELECT * FROM users WHERE id= ?";
      console.log(sql, a);
      con.query(sql, [a], function(err, result) {
        if (err) throw err;
        console.log(result[0].location);
        let b = result[0].location;
        var sql = "SELECT * FROM location WHERE location_id= ?";
        console.log(sql, b);
        con.query(sql, [b], function(err, result) {
          if (err) throw err;
          console.log(result[0]);
          var sql =
            "SELECT ev.event_id, loc.lat, loc.lng  from events ev INNER JOIN location loc ON ev.location=loc.location_id where event_id=1";
          con.query(sql, [], function(err, result2) {
            if (err) throw err;
            console.log(result2[0]);
            var resJ = {};
            resJ.result1 = result[0];
            resJ.result2 = result2[0];
            res.send(resJ);
          });
        });
      });
      console.log("cooking");
    });
  });
});

// Post signup
router.post("/signup", function(req, res, next) {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(
        "Error:\nCode: " + errorCode + "\nMessage: " + errorMessage
      );
    });

  res.redirect("/login");
});

// Post signin
router.post("/signin", function(req, res, next) {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = errorMessage;
      console.error(
        "Error:\nCode: " + errorCode + "\nMessage: " + errorMessage
      );
    });

  res.redirect("/");
});
router.post("/login", function(req, res, next) {
  let a = req.body.email;
  let b = req.body.password;
  var con = mysql.createConnection({
    host: "34.73.223.220",
    user: "hackduke",
    password: "oliver",
    database: "test"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM users WHERE email= ?";
    console.log(sql, a);
    con.query(sql, [a], function(err, result) {
      if (err) throw err;
      console.log(result[0].password);
      if (result[0].password == b) {
        res.cookie("Cookie", { test: result });
        res.json({ body: result[0] });
        console.log("cooking");
      }
    });
  });
});
router.post("/drive", function(req, res, next) {
  console.log(req.body);
  let a = req.body.username;
  let b = req.body.password;
  let bc = req.body.address;
  let c = req.body.state;
  let d = req.body.city;
  let e = req.body.zip;
  let type = "Driver";
  let assigned = "No";
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
  console.log(e);
  var con = mysql.createConnection({
    host: "34.73.223.220",
    user: "hackduke",
    password: "oliver",
    database: "test"
  });

  let addressString = bc + "+" + c + "+" + d + "+" + e;
  console.log(addressString);
  Request.post(
    {
      headers: { "content-type": "application/json" },
      url:
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        addressString +
        "&key=AIzaSyBCUiun3GfVhDIslkBV4Cf657dkStM-z80"
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      body = JSON.parse(body);
      console.log(JSON.stringify(body));
      if (body.status != "ZERO_RESULTS" && body.status != "REQUEST_DENIED") {
        let place_id = body.results[0].place_id;
        let lat = body.results[0].geometry.location.lat;
        let lng = body.results[0].geometry.location.lng;

        con.connect(function(err) {
          if (err) throw err;
          console.log("Connected! HA Ha");
          var locationSql =
            "INSERT IGNORE INTO location (location_id, address, city, state, zip, lat, lng) VALUES (?,?,?,?,?,?,?)";
          console.log(locationSql, d);
          con.query(locationSql, [place_id, bc, c, d, e, lat, lng], function(
            err,
            result
          ) {
            if (err) throw err;
            console.log("1 record inserted");
          });

          var sql =
            "INSERT INTO users(email, password, address, type, assigned, zip, state, city, location) VALUES (?,?,?,?,?, ?, ?, ?, ?)";
          console.log(sql, d);
          con.query(
            sql,
            [a, b, bc, type, assigned, e, c, d, place_id],
            function(err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            }
          );
        });
      } else {
        console.log("API Error");
      }
    }
  );

  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO users(email, password, address, type, assigned, zip, state, city) VALUES (?,?,?,?,?, ?, ?, ?)";
    console.log(sql, d);
    con.query(sql, [a, b, bc, type, assigned, e, c, d], function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });*/
  res.redirect("/login");
});
router.post("/ride", function(req, res, next) {
  console.log(req.body);
  let a = req.body.username;
  let b = req.body.password;
  let bc = req.body.address;
  let c = req.body.state;
  let d = req.body.city;
  let e = req.body.zip;
  let type = "Rider";
  let assigned = "No";
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
  console.log(e);
  var con = mysql.createConnection({
    host: "34.73.223.220",
    user: "hackduke",
    password: "oliver",
    database: "test"
  });

  let addressString = bc + "+" + c + "+" + d + "+" + e;
  Request.post(
    {
      headers: { "content-type": "application/json" },
      url:
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        addressString +
        "&key=AIzaSyBCUiun3GfVhDIslkBV4Cf657dkStM-z80"
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      body = JSON.parse(body);
      console.log(JSON.stringify(body));
      if (body.status != "ZERO_RESULTS" && body.status != "REQUEST_DENIED") {
        let place_id = body.results[0].place_id;
        let lat = body.results[0].geometry.location.lat;
        let lng = body.results[0].geometry.location.lng;

        con.connect(function(err) {
          if (err) throw err;
          console.log("Connected! HA Ha");
          var locationSql =
            "INSERT IGNORE INTO location (location_id, address, city, state, zip, lat, lng) VALUES (?,?,?,?,?,?,?)";
          console.log(locationSql, d);
          con.query(locationSql, [place_id, bc, c, d, e, lat, lng], function(
            err,
            result
          ) {
            if (err) throw err;
            console.log("1 record inserted " + place_id);
          });

          var sql =
            "INSERT INTO users(email, password, address, type, assigned, zip, state, city, location) VALUES (?,?,?,?,?, ?, ?, ?, ?)";
          console.log(sql, d);
          con.query(
            sql,
            [a, b, bc, type, assigned, e, c, d, place_id],
            function(err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            }
          );
        });
      } else {
        console.log("API Error");
      }
    }
  );

  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO users(email, password, address, type, assigned, zip, state, city) VALUES (?,?,?,?,?, ?, ?, ?)";
    console.log(sql, d);
    con.query(sql, [a, b, bc, type, assigned, e, c, d], function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });*/
  res.redirect("/login");
});
app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
