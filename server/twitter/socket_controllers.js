var app = require('../app.js');
var server = require('http').Server(app);
var socketio = require('socket.io')(server);

// Example use case
// io.on('connection', function(socket) {
//   console.log('new connection established');
// });

module.exports = socketio;
