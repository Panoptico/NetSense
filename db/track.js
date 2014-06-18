var mongoose = require('mongoose');
var TweetSchema = require('./tweet.js').Schema;
var UserSchema = require('./user.js').Schema;

var TrackSchema = new mongoose.Schema({
  name: {type: String,
    required: true,
    unique: true
  },
  tweets: [TweetSchema], //tweets
  followers: [UserSchema], //user ids
  streaming: Boolean
});

var Tracks = mongoose.model('Tracks', TrackSchema);

module.exports = Tracks;

//ToDo: include users and tweets as subdocuments
