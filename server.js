var app = require('./server/app.js');

var port  = app.get('port'),
    log   = 'Listening on ' + app.get('base url') + ':' + port;

app.listen(port);
console.log(log);
