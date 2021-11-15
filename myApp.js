var express = require('express');
var app = express();
var bodyParser = require("body-parser");

//"Use body-parser to Parse POST Requests"
app.use(bodyParser.urlencoded({ extended: false }));

//"Implement a Root-Level Request Logger Middleware"
app.use("/",function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next()
})

//"Meet the node console"
console.log("Hello World");

//"Start a Working Express Server"
//"Serve an HTML file"
var absolutePathIndex = __dirname + "/views/index.html";
app.get('/',function(req,res) {
    res.send("Hello Express");
    res.sendFile(absolutePathIndex);
})

//"Serve Static Assets"
var absolutePathPublic = __dirname + "/public";
app.use("/public",express.static(absolutePathPublic))

//"Serve Json on a Specific Route"
// "Use the .env File"
app.get("/json",function(req,res)  {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({"message":"HELLO JSON"})
  }  else {
       res.json({"message":"Hello json"})
     }
})

//"Chain Middleware to Create a Time Server"
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
},
function(req,res) {
  res.json({time:req.time});
})

//"Get Route Parameter Input from the Client"
app.get(
  '/:word/echo', (req,res,next) => {
    res.json({echo: req.params.word});
    next();
  })

//"Get Query Parameter Input from the Client"
app.route('/name')
  .get((req,res) => {
    var firstName = req.query.first;
    var lastName = req.query.last;
    res.json({name: firstName + ' ' + lastName});
  }
) //.post(bodyParser.json) //"Use body-parser to Parse POST Requests"
//"Get Data from POST Requests"
  .post((req,res) => {
    var firstN = req.body.first;
    var lastN = req.body.last;
    res.json({name: firstN + ' ' + lastN});
  }
)

 module.exports = app;
