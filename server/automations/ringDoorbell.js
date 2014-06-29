var socketMethods = require('../twitter/socket_controllers.js');
var socket;

var sendEmail = require('./sendEmail');

var recipients = 'strixcuriosus@gmail.com, a.c.krause@gmail.com, weijin84@gmail.com, syeoryn@gmail.com';

module.exports = exports = {
  ringDoorbell: function(tweet, nlp, trackName){
    console.log('Ding!');
    var message = tweet.user.screen_name + ' is at the door!' + '\n\n' + tweet.user.screen_name + ': ' + tweet.text;
    if(socket) {
      socket.emit('ding', {message: 'hello world'});
    }
    sendEmail(recipients, 'I\'m at the door!',  message);
  },
  setSocket: function(socketRef) {
    socket = socketRef;
  } 

};
