var Users = require('../server/user/user_model.js');
var Tracks = require('../server/track/track_model.js');
var Tweets = require('../server/tweet/tweet_model.js');

var handleDatabaseResponse = function(err, data, next) {
  if (err) {
    next(err);
    // return err;
  } else {
    next(null, data);
    // return data;
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

  findTweetsByIds: function(tweetIds, next) {
    var tweets = Tweets.find({tweetId: {$in: tweetIds}}).exec();

    tweets.then(function(data) {
      handleDatabaseResponse(null, data, next);
    }, function(err) {
      handleDatabaseResponse(err, null, next);
    });
  },

  findTweetsContainingUserId: function(userId, next) {
    Tweets.find().or([
      {twitterUserId: userId}, 
      {inReplyToUserIdStr: userId},
      {mentionedUserIds: userId}
    ]).exec(function(err, tweetData) {
      handleDatabaseResponse(err, tweetData, next);
    });
  },

  deleteTweet: function(tweet, next) {
    Tweets.remove(tweet, function(err) {
      handleDatabaseResponse(err, null, next);
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
        //the update method's callback takes 3 parameters: error, numberAffected, raw
        handleDatabaseResponse(err, numberAffected, next);
      });
    } else {
      next("DB: passed in object missing twitterUserId");
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
      handleDatabaseResponse(err, data, next);
    });
  },

  addTweetToTrack: function(trackName, tweetId, next) {
    // findOne returns a sigle document, find returns an array of documents
    Tracks.findOne({name: trackName}, function(err, data) {
      if (err) {
        next(err);
      } else if (data) {
        Tracks.update({name: data.name}, {tweets: data.tweets.concat([tweetId])}, function(err, numberAffected, raw) {
          handleDatabaseResponse(err, numberAffected, next);
        });
      } else {
        next('DB: track not in DB');
      }
    });
  },

  findTrackByName: function(trackName, next) {
    Tracks.findOne({name: trackName}, function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  },

  findTracksByNames: function(trackNames, next) {    
    var tracks = Tracks.find({name: {$in: trackNames}}).exec();

    tracks.then(function(data) {
      handleDatabaseResponse(null, data, next);
    }, function(err) {
      handleDatabaseResponse(err, null, next);
    });
  },

  findAllTracks: function(next) {
    Tracks.find(function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  },

  findAllTweets: function(next) {
    Tweets.find(function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  }
};
