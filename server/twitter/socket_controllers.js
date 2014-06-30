var Twit = require('Twit');
var sentiment = require('../sentiment/sentiment_controllers.js');

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMERKEY,
  consumer_secret: process.env.TWITTER_CONSUMERSECRET,
  access_token: process.env.TWITTER_ACCESSTOKEN,
  access_token_secret: process.env.TWITTER_ACCESSTOKENSECRET
});

module.exports = {
  sendTrackStream: function(socket, trackName) {
    console.log('Creating stream for:', trackName);

    var stream = T.stream('statuses/filter', {track: trackName});

    stream.on('tweet', function(tweet) {
      console.log(trackName, 'streamed new tweet:', tweet.id_str);

      tweet.sentimentScore = sentiment.analyze(tweet.text).score;
      socket.emit('tweet', tweet);
    });
  },
  
  listenForDoorbell: function(socket, message) {
    socket.emit('ding', {message: message});
  }
};
