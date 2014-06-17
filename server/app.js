var express  = require('express'),
    passport = require('./config.js').passport;

var app = express();

var routers = {
  loginRouter: express.Router(),
  staticAssetsRouter: express.Router(),
  tweetDataRouter: express.Router()
};

require('./config.js').config(app, express, routers);
require('./routers/loginRouter.js')(routers.loginRouter, passport);
require('./routers/staticAssetsRouter.js')(routers.staticAssetsRouter);
require('./routers/tweetDataRouter.js')(routers.tweetDataRouter);

module.exports = exports = app;
