var Twit = require('Twit'),
    databaseHelpers = require('../db/databaseHelpers.js');

var saveTweets = function(stream) {
  stream.on('tweet', function (tweet) {
    // save processed tweet to DB
    databaseHelpers.saveTweet(processTweet(tweet), function(err, data) {console.log(err, data);});
  });
};

module.exports = exports = {
  makeNewStream: function(track, token, secret) {
    var T = new Twit({
      consumer_key: process.env.CONSUMERKEY,
      consumer_secret: process.env.CONSUMERSECRET,
      access_token: token,
      access_token_secret: secret
    });

    var stream = T.stream('statuses/filter', {track: track});
    saveTweets(stream);
    return stream;
  },

  sendRetweet: function(tweetId, token, tokenSecret) {
    var T = new Twit({
      consumer_key: process.env.CONSUMERKEY,
      consumer_secret: process.env.CONSUMERSECRET,
      access_token: token,
      access_token_secret: tokenSecret
    });

    T.post('statuses/retweet/' + tweetId, {id: tweetId}, function(err, data, response) {
      if (err) {
        console.log('error:', err);
      } else {
        console.log('Retweeted!');
      }
    });
  },

  sendTweet: function(text, token, tokenSecret) {
    var T = new Twit({
      consumer_key: process.env.CONSUMERKEY,
      consumer_secret: process.env.CONSUMERSECRET,
      access_token: token,
      access_token_secret: tokenSecret
    });

    T.post('statuses/update', {status: text}, function(err, data, response) {
      if (err) {
        console.log('error:', err);
      } else {
        console.log("Tweeted!");
      }
    });
  }
};
