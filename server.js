var app = require('./server/app.js');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port  = app.get('port'),
    log   = 'Listening on ' + app.get('base url') + ':' + port;

server.listen(port);
console.log(log);
