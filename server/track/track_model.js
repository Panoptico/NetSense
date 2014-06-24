var mongoose = require('mongoose');
var UserSchema = require('../user/user_model.js').Schema;
var TweetSchema = require('../tweet/tweet_model.js').Schema;

var TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  tweets: [String], //tweet Ids
  followers: [String], //user Ids
  streaming: Boolean
});

var Tracks = mongoose.model('Tracks', TrackSchema);

module.exports = Tracks;

//ToDo: include users and tweets as subdocuments
