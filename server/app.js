var express = require('express');
var passport = require('./passport/passport_controllers.js');

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
