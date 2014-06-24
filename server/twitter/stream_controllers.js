var Twit = require('twit');
var dbMethods = require('../../db/database_controllers.js');
var tweetMethods = require('./tweet_controllers.js');

var saveTweetsToTrack = function(stream, trackName) {
  dbMethods.saveNewTrackByName(trackName, function(err, data) {
    if(err) {console.log('error1 track already exists');};
    stream.on('tweet', function (tweet) {
      // save processed tweet to DB
      var processedTweet = tweetMethods.processTweet(tweet);
      dbMethods.saveTweet(processedTweet, function(err, data) {
        if (err) {
          console.log('error2 trackName already exists');
          return;
        }
        dbMethods.addTweetToTrack(trackName, tweet.id_str, function(err, data) {
          if(err) {console.log('error:  ', err); return;}
        });
      });
    });
  })
};

module.exports = exports = {
  makeNewStream: function(track, token, secret) {
    var T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMERKEY,
      consumer_secret: process.env.TWITTER_CONSUMERSECRET,
      access_token: token,
      access_token_secret: secret
    });
    var stream = T.stream('statuses/filter', {'track': track});
    console.log('created stream instance:', track);
    saveTweetsToTrack(stream, track);
    return stream;
  },

  sendRetweet: function(tweetId, token, tokenSecret) {
    var T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMERKEY,
      consumer_secret: process.env.TWITTER_CONSUMERSECRET,
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
      consumer_key: process.env.TWITTER_CONSUMERKEY,
      consumer_secret: process.env.TWITTER_CONSUMERSECRET,
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

var initStreams = function() {
  dbMethods.findAllTracks(function(err, data) {
    if (err) {
      console.log(err);
    }
    for (var i = 0; i < data.length; i++) {
      exports.makeNewStream(data[i].name, process.env.TWITTER_ACCESSTOKEN, process.env.TWITTER_ACCESSTOKENSECRET);
    } 
  });
};

initStreams();
