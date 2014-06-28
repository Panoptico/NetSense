var getInformation = function(tweet, nlp, trackName){
  console.log(nlp.entities.search_query[0].value)
  // link to let me google that for you...
  var link = 'http://lmgtfy.com/?q=' + nlp.entities.search_query[0].value.split(' ').join('+');
  
  // replyToTweet(tweet, link);
}

module.exports = getInformation;