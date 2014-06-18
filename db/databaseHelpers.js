var Tweets = require('./tweet.js');
var Users = require('./user.js');
var Tracks = require('./track.js');

var handleDatabaseResponse = function(err, data, next) {
  if (err) {
    console.error(err);
    next(err);
    return err;
  } else {
    next(null, data);
    return data;
  }
};

module.exports = exports = {
  saveTweet: function(tweet, next) {
    //save to deleteUserById
    Tweets.create(tweet, function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  },

  findTweetById: function(tweetId, next) {
    Tweets.find({tweetId: tweetId}, function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  },

  findTweetsContainingUserId: function(userId, next) {
    var tweets = Tweets.find().or([
      {twitterUserId: userId}, 
      {inReplyToUserIdStr: userId},
      {mentionedUserIds: userId}
    ]).exec();

    tweets.then( function(err, tweetData) {
      handleDatabaseResponse(err, tweetData, next);
    });
  },

  saveNewUser: function(user, next) {
    Users.create(user, function(err, data) {
      handleDatabaseResponse(err, data, next);
    }); 
  },

  updateUserInfo: function(user, next) {
    if(user.twitterUserId) {
      Users.update({twitterUserId: user.twitterUserId}, user, function(err, numberAffected, raw) {
        handleDatabaseResponse(err, numberAffected, next);
      });
    } else {
      next(null);
    }
  },

  findUserById: function(twitterUserId, next) {
    Users.find({twitterUserId: twitterUserId}, function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  },

  deleteUserById: function(twitterUserId, next) {
    Users.remove({twitterUserId: twitterUserId}, function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  },

  saveNewTrackByName: function(trackName, next) {
    Tracks.create({name: trackName}, function(err, data) {
      console.error(err);
      handleDatabaseResponse(err, data, next);
    });
  },

  addTweetToTrack: function(trackName, tweet, next) {
    Tracks.findOne({name: trackName},function(err, track){
      track.tweets.push(tweet);
      track.save(function (err) {
        if (err) {console.error(err);}
        next(err);
      });
    });
  },
  findTrackByName: function(trackName, next) {
    Tracks.find({name: trackName}, function(err, data){
      handleDatabaseResponse(err, data, next);
    });
  }

};
