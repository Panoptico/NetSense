var Twit = require('twit');
var dbMethods = require('../../db/database_controllers.js');
var tweetMethods = require('./tweet_controllers.js');
var automationsRouter = require('../automations/automationsRouter.js');
var processor = require('../processing_controllers.js');

var onTweet = function(tweet, trackName){
  var reformattedTweet = tweetMethods.processTweet(tweet);
  var analyzedTweet = processor.sentimentAnalysis(reformattedTweet);

  

  // TODO: get trackName from tweet object...



  automationsRouter.automate(tweet, trackName);
  console.log('tweet processed!');
  dbMethods.saveTweet(analyzedTweet, function(err, data){
    if(err) {
      console.log('Error while saving tweet', analyzedTweet);
    } else {
      dbMethods.addTweetToTrack(trackName, tweet.id_str, function(err, data){
        if(err) {
          console.log('Error while saving tweet:', tweet, 'to track:', trackName);
          return;
        }
      });
    }
  });
}

var twitterStream = {};

var startStream = function(trackName, token, secret) {
  var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMERKEY,
    consumer_secret: process.env.TWITTER_CONSUMERSECRET,
    access_token: token,
    access_token_secret: secret
  });   

  twitterStream.stream = T.stream('statuses/filter', {track: trackName});
  console.log('Created stream instance:', trackName);
  
  twitterStream.stream.on('tweet', function (tweet) {
    console.log('tweet found!');
    onTweet(tweet, trackName);
  });
}

module.exports = exports = {
  saveTrack: function(trackName, token, secret) {
    dbMethods.saveNewTrackByName(trackName, function(err, data) {
      if(err) {
        console.log('error1 track already exists');
        return;
      };
      // Stop stream
      streams.stream.stop();
      // Restart stream with updated tracks
      initStreams();
      // startStream(trackName, token, secret);
      // return true to indicate that stream did not previously exist
      return true;
    })
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
    var streams = [];

    for (var i = 0; i < data.length; i++) {
      streams.push(data[i].name);
    } 
      startStream(streams, process.env.TWITTER_ACCESSTOKEN, process.env.TWITTER_ACCESSTOKENSECRET);
  });
};

initStreams();
