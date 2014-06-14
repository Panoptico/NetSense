var mongoose = require('mongoose');

var TweetSchema = new mongoose.Schema({
  createdAt: String,
  tweetId: {type: String,
    required: true,
    unique: true
  },
  text: String,
  twitterUserId: String,
  userName: String,
  userScreenName: String,
  userLocation: String,
  latitude: Number,
  longitude: Number,
  retweetCount: Number,
  inReplyToUserIdStr: String,
  mentionedUserIds: [String]
});

var Tweets = mongoose.model('Tweets', TweetSchema);

module.exports = Tweets;


//ToDo: include users as subdocuments
//e.g. TweetSchema.user = [UserSchema]
    // Tweet.mentionedUsers