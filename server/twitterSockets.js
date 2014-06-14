var app = require('./app.js');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var twitterHelpers = require('twitterHelpers');

io.on('connection', function(socket) {
  console.log('new connection established');
  // TODO: hook up socket connection with client
  // twitterHelpers.stream.on('tweet', function (tweet) {
  //   socket.emit('tweet', tweet);
  // });
});
