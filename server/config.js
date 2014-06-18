var bodyParser       = require('body-parser');
var cookieParser     = require('cookie-parser');
var cors             = require('cors');
var session          = require('express-session');
var middle           = require('./middleware');
var mongoose         = require('mongoose');

mongoose.connect(process.env.DB_URL);

module.exports = exports = {
  config: function(app, express, routers) {
    app.set('port', process.env.PORT || 8080);
    app.set('base url', process.env.URL || 'http://localhost');
    app.use(cors());
    app.use(express.static(__dirname.substr(0, __dirname.length-7) + '/client/www'));
    app.use(cookieParser()) ;
    app.use(bodyParser());
    app.use(session({secret: 'secret'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api/v1/login/twitter', routers.loginRouter);
    app.use('/static/v1', routers.staticAssetsRouter);
    app.use('/tweetdata/v1', routers.tweetDataRouter);
    app.use(middle.logError);
    app.use(middle.handleError);
  }
};
