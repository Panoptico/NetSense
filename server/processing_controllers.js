var sentiment = require('Sentimental');

exports.sentimentAnalysis = function(tweet){
  var sentimentScore = sentiment.analyze(tweet.text).score;
  tweet.sentimentScore = sentimentScore;
  return tweet;
}

exports.NLP = function(tweet){
  // TODO: call Wit.AI

  return tweet;
}