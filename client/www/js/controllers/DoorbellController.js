window.__netsense_url = 'http://localhost:8080';

var socket = io.connect(window.__netsense_url);
    socket.emit('doorbell', {message: 'listening for the doorbell'});
socket.on('ding', function(data) {console.log('ding!!!')});