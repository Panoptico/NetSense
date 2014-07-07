var app = require('./server/app.js');
var server = require('http').Server(app);
var socketio = require('socket.io')(server);
var socketMethods = require('./server/twitter/socket_controllers.js');
var doorbell = require('./server/automations/ringDoorbell.js');

var port = app.get('port');

server.listen(port);
console.log('Listening on ' + app.get('base url') + ':' + port);

socketio.on('connection', function(socket) {
  console.log('Established new socket connection');
  
  // instantiates variable to store the twitter stream object
  var __netsense_twit_stream;

  socket.on('track', function(data) {
    // if there is an existing stream, first stop it
    if (__netsense_twit_stream) __netsense_twit_stream.stop();
    console.log('Stopping existing stream');

    __netsense_twit_stream = socketMethods.sendTrackStream(socket, data);
  });

  socket.on('doorbell', function(data) {
    socket.emit('welcomed', data);
    doorbell.setSocket(socket);
  });
});
