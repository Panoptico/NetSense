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

  socket.on('track', function(data) {
    socketMethods.sendTrackStream(socket, data);
  });

  socket.on('doorbell', function(data) {
    socket.emit('welcomed', data);
    doorbell.setSocket(socket);
  });
});
