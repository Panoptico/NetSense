var Users = require('../server/user/user_model.js');
var Tracks = require('../server/track/track_model.js');
var Tweets = require('../server/tweet/tweet_model.js');

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

  findTweetsByIds: function(tweetIds, next) {
    var query = [];
    for (var i = 0; i < tweetIds.length; i++) {
      query.push({tweetId: tweetIds[i]});
    }

    var tweets = Tweets.find().or(query).exec();

    tweets.then(function(data) {
      handleDatabaseResponse(null, data, next);
    }, function(err) {
      handleDatabaseResponse(err, null, next);
    });
  },

  findTweetsContainingUserId: function(userId, next) {
    var tweets = Tweets.find().or([
      {twitterUserId: userId}, 
      {inReplyToUserIdStr: userId},
      {mentionedUserIds: userId}
    ]).exec();
    //TODO: log errors for find

    tweets.then(function(tweetData) {
      var err = null;
      handleDatabaseResponse(err, tweetData, next);
    });
  },

  deleteTweet: function(tweet, next) {
    Tweets.remove(tweet, function(err) {
      var data = null;
      handleDatabaseResponse(err, data, next);
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
      if(err) {console.log('error3 trackName already exists');}
      handleDatabaseResponse(err, data, next);
    });
  },

  addTweetToTrack: function(trackName, tweetId, next) {
    Tracks.findOne({name: trackName},function(err, track){
      if (err) {console.log('error: ', err);}
      if (track) {
        track.tweets.push(tweetId);
        track.save(function (err, track) {
          next(err, track);          
        });
      } else {
        next(err)
      }
    });
  },

  findTrackByName: function(trackName, next) {
    Tracks.findOne({name: trackName}, function(err, data){
      handleDatabaseResponse(err, data, next);
    });
  },

  findTracksByNames: function(trackNames, next) {
    var query = [];
    for (var i = 0; i < trackNames.length; i++) {
      query.push({name: trackNames[i]});
    }
    
    var tracks = Tracks.find().or(query).exec();

    tracks.then(function(data) {
      handleDatabaseResponse(null, data, next);
    }, function(err) {
      handleDatabaseResponse(err, null, next);
    });
  },

  findAllTracks: function(next) {
    Tracks.find(function(err,data){
      handleDatabaseResponse(err,data,next);
    });
  },

  findAllTweets: function(next) {
    Tweets.find(function(err, data){
      handleDatabaseResponse(err, data, next);
    });
  }
};
