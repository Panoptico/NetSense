var mongoose = require('mongoose');

var TweetSchema = new mongoose.Schema({
  createdAt: String,
  tweetId: {type: String,
    required: true
  } ,
  text: String,
  userId: String,
  userName: String,
  userScreenName: String,
  userLocation: String,
  latitude: Number,
  longitude: Number,
  retweetCount: Number 
});

var Tweets = mongoose.model('Tweets', TweetSchema);

module.exports = Tweets;
