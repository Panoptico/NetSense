var app = require('./server/app.js');
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

var port = app.get('port');

app.listen(port);
console.log('Listening on ' + app.get('base url') + ':' + port);
