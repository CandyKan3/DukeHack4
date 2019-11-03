var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());

const API_PORT = 5000;
const firebase = require('./database');

// Get homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getuser', function(req, res, next) {
    console.log(req.cookies.Cookie);
    res.send(req.cookies.Cookie);
});

// Post signup
router.post('/signup', function(req, res, next) {
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
        'Error:\nCode: ' + errorCode + '\nMessage: ' + errorMessage
      );
    });

  res.redirect('/login');
});

// Post signin
router.post('/signin', function(req, res, next) {
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
        'Error:\nCode: ' + errorCode + '\nMessage: ' + errorMessage
      );
    });

  res.redirect('/');
});
router.post('/login', function(req, res, next) {
  let a = req.body.email;
  let b = req.body.password;
  var con = mysql.createConnection({
    host: '34.73.223.220',
    user: 'hackduke',
    password: 'oliver',
    database: 'test'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    var sql = 'SELECT * FROM users WHERE email= ?';
    console.log(sql, a);
    con.query(sql, [a], function(err, result) {
      if (err) throw err;
      console.log(result[0].password);
      if (result[0].password == b) {
        res.cookie('Cookie', { test: result });
        res.redirect('/test');
        console.log('cooking');
      }
    });
  });
});
router.post('/drive', function(req, res, next) {
  console.log(req.body);
  let a = req.body.username;
  let b = req.body.password;
  let bc = req.body.address;
  let c = req.body.state;
  let d = req.body.city;
  let e = req.body.zip;
  let type = 'Driver';
  let assigned = 'No';
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
  console.log(e);
  var con = mysql.createConnection({
    host: '34.73.223.220',
    user: 'hackduke',
    password: 'oliver',
    database: 'test'
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    var sql =
      'INSERT INTO users(email, password, address, type, assigned, zip, state, city) VALUES (?,?,?,?,?, ?, ?, ?)';
    console.log(sql, d);
    con.query(sql, [a, b, bc, type, assigned, e, c, d], function(err, result) {
      if (err) throw err;
      console.log('1 record inserted');
    });
  });
  res.redirect('/login');
});
router.post('/ride', function(req, res, next) {
  console.log(req.body);
  let a = req.body.username;
  let b = req.body.password;
  let bc = req.body.address;
  let c = req.body.state;
  let d = req.body.city;
  let e = req.body.zip;
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
  console.log(e);
  res.redirect('/login');
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
