var request = require('request');
var cheerio = require('cheerio');

var getInformation = function(tweet, nlp, trackName){
  console.log(nlp.entities.search_query[0].value)
  var query = nlp.entities.search_query[0].value.split(' ').join('+')
  if(Math.random < .75){
    // 75% chance: first link in google results
    var target = 'http://www.google.com/search?q=' + query;
    var link = crawlForLink(target);
  } else {
    // 25% chance: link to let me google that for you...
    var link = 'http://lmgtfy.com/?q=' + query;
  }
  
  // replyToTweet(tweet, link);
}

var crawlForLink = function(target){
  request(target, function(err, response, body){
    if(err) console.error(err);
    if(response.statusCode === 200){
      $ = cheerio.load(body);
      var link = $('.r > a')[0].attribs.href;
      link = link.slice( link.indexOf('http'), link.indexOf('&sa=') );
      return link;
    }
  }
  return target;
}

module.exports = getInformation;