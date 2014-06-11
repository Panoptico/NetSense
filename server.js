var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 8080;


//middleware
app.use(cors());
app.use(express.static(__dirname + '/public'));


//routes
app.get('/', function(req, res){
  res.redirect('/index.html');
});

app.get('/emberTest', function(req, res){
  res.send(200, ':-)');
});


app.listen(port);
console.log('Listening on port:', port);
