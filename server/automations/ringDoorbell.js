var sendEmail = require('./sendEmail');

var recipients = 'strixcuriosus@gmail.com, a.c.krause@gmail.com, weijin84@gmail.com, syeoryn@gmail.com'

var ringDoorbell = function(tweet, nlp, trackName){
  console.log('Ding!')
  var message = tweet.user.screen_name + ' is at the door!' + '\n\n' + tweet.user.screen_name + ': ' + tweet.text;

  sendEmail(recipients, 'I\'m at the door!',  message);
};

module.exports = ringDoorbell;
