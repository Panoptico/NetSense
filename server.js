var express = require('express');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 8080;


//middleware
app.use(cors());
app.use(express.static(__dirname + '/public'));


//routes
app.get('/', function(req, res){
  res.redirect('/index.html');
});


app.listen(port);