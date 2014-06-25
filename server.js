var app = require('./server/app.js');
var server = require('http').Server(app);
var socketio = require('socket.io')(server);
var socketMethods = require('./server/twitter/socket_controllers.js');

var port = app.get('port');

server.listen(port);
console.log('Listening on ' + app.get('base url') + ':' + port);

socketio.on('connection', function(socket) {
  console.log('Established new socket connection');

  socket.on('track', function(data) {
    socketMethods.sendTrackStream(socket, data);
  });
});

/*
var Twit = require('Twit');
var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMERKEY,
  consumer_secret: process.env.TWITTER_CONSUMERSECRET,
  access_token: process.env.TWITTER_ACCESSTOKEN,
  access_token_secret: process.env.TWITTER_ACCESSTOKENSECRET
});
var stream = T.stream('statuses/sample');
stream.on('tweet', function(tweet) {
  console.log(tweet);
});
*/
