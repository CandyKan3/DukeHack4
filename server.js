var express = require('express');
var app = express();
var router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const API_PORT = 5000;

// Get homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Post signup
router.post('/signup', function(req, res, next) {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  res.redirect('/login');
});

// Post signin
router.post('/signin', function(req, res, next) {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  res.redirect('/');
});

router.post('/drive', function(req, res, next) {
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
