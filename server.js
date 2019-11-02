var express = require('express');
var app = express();
var router = express.Router();
  var mysql = require('mysql');
  const bodyParser = require('body-parser');
  app.use(bodyParser.json())
/* GET home page. */
const API_PORT = 5000;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/meeting', function(req, res, next) {
  res.render('meeting', { title: 'Express' });
});
router.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
router.post('/login', function(req, res, next) {
  console.log(req.body);
  let a = req.body.username;
  let b = req.body.password;
  console.log(a);
  console.log(b);
var con = mysql.createConnection({
  host: "-",
  user: "-",
  password: "-",
  database: "crest"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO meetings(name, created, type, notes) VALUES (?,?,?,?)";
  console.log(sql, d);
 con.query(sql,[a,b,c,d], function (err, result) {
   if (err) throw err;
   console.log("1 record inserted");
 });
});
  res.redirect("/login");
});
router.get('/meetinghistory', function(req, res, next) {
  var con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

con.connect(async function(err) {
  let promise = new Promise((resolve, reject) => {
    if (err) throw err;
    con.query("SELECT * FROM meetings", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
  res.json( {title: result});
    });

 });


});
});


app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
