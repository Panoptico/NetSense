var request = require('request');
var cheerio = require('cheerio');
var twitter = require('../twitter/tweet_controllers.js');

var getInformation = function(tweet, nlp, trackName){
  console.log(nlp.entities.search_query[0].value)
  var query = nlp.entities.search_query[0].value.split(' ').join('+')
  if(Math.random() < .75){
    // 75% chance: first link in google results
    var target = 'http://www.google.com/search?q=' + query;
    console.log('target:', target);
    var link = crawlForLink(target);
    console.log('sliced!', link);
  } else {
    // 25% chance: link to let me google that for you...
    var link = 'http://lmgtfy.com/?q=' + query;
  }
  
  // replyToTweet(tweet, link) as NetSenseHR
  twitter.sendTweet(link, tweet.id_str, tweet.user.screen_name, process.env.TWITTER_ACCESSTOKEN, process.env.TWITTER_ACCESSTOKENSECRET)
}

var crawlForLink = function(target){
  request(target, function(err, response, body){
    if(err) console.error(err);
    if(response.statusCode === 200){
      $ = cheerio.load(body);
      var link = $('.r > a')[0].attribs.href;
      console.log('unsliced link:', link)
      link = link.slice( link.indexOf('http'), link.indexOf('&sa=') );
      return link;
    }
  });
  return target;
}

module.exports = getInformation;