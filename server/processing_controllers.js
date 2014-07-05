var sentiment = require('sentiment');

exports.sentimentAnalysis = function(tweet){
  var sentimentScore = sentiment(tweet.text).score;
  console.log(sentimentScore);
  tweet.sentimentScore = sentimentScore;
  return tweet;
};
