var Twit = require('twit');
var dbMethods = require('../../db/database_controllers.js');
var tweetMethods = require('./tweet_controllers.js');
var automationsRouter = require('../automations/automationsRouter.js');
var processor = require('../processing_controllers.js');

var onTweet = function(tweet, trackName){
  var reformattedTweet = tweetMethods.processTweet(tweet);
  var analyzedTweet = processor.sentimentAnalysis(reformattedTweet);

  // Get all tracks from tweet
  var trackNames = getTrackNames(tweet);

  automationsRouter.automate(tweet, trackNames);
  console.log('tweet processed!');

  // dbMethods.saveTweet(analyzedTweet, function(err, data){
  //   if(err) {
  //     console.log('Error while saving tweet', analyzedTweet);
  //   }
  // })

  // for(var i = 0; i < trackNames.length; i++){
  //   dbMethods.addTweetToTrack(trackNames[i], tweet.id_str, function(err, data){
  //     if(err) {
  //       console.log('Error while saving tweet to track', trackNames[i])
  //     }
  //   });
  // }
}


// WARNING: DOES NOT DISTINGUISH TRACKS FROM HASHTAGS VS MENTIONS
var getTrackNames = function(tweet){
  var text = ' ' + tweet.text;
// Find all hashtags and mentions
                        // match all hashtags and mentions 
                        // (nonword character + # or @ + some number of letters + nonword character)

                        // returns array, or null, so ensure an array is found
  var trackNames = tweet.text.match(/\W([#@]\w+)/g) || []

  // then join the array
  trackNames = trackNames.join('')
                         // and remove the # and @
                         .replace(/#|@/g,'')
                         // then split the results into an array
                         .split(' ');

  // first index is an empty string (from searching for spaces, then spliting on spaces)
  // so replace it with user name (instead of pushing username to end of array)
  trackNames[0] = tweet.user.screen_name;

  return trackNames;
}


var startStream = function(trackName, token, secret) {
  var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMERKEY,
    consumer_secret: process.env.TWITTER_CONSUMERSECRET,
    access_token: token,
    access_token_secret: secret
  });   

  // Prefer to use statuses/filter, but 'user' is more reliable
  twitterStream.stream = T.stream('user', {track: trackName});
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

var twitterStream = {};
initStreams();
