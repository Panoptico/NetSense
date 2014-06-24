var app = require('../app.js');
var server = require('http').Server(app);
var socketio = require('socket.io')(server);

module.exports = {
  socketio: socketio,

  makeTweetMap: function(trackName) {
    var T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMERKEY,
      consumer_secret: process.env.TWITTER_CONSUMERSECRET,
      access_token: process.env.TWITTER_ACCESSTOKEN,
      access_token_secret: process.env.TWITTER_ACCESSTOKENSECRET
    });

    var stream = T.stream('statuses/filter', {'track': trackName});

    socketio.on('connection', function(socket) {
      console.log('new socket connection established');
      stream.on('tweet', function (tweet) {
        socket.emit('tweet', tweet);
      });
    });
  }
};
