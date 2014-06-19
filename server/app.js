var express   = require('express');
var passport  = require('./passport/passport_controllers.js');

var app = express();

var routers = {
  twitterLoginRouter: express.Router(),
  staticAssetsRouter: express.Router(),
  tweetDataRouter: express.Router(),
};

require('./config.js').config(app, express, routers);
require('./login/twitterLogin/twitter_login_routes.js')(routers.twitterLoginRouter, passport);
require('./static/static_asset_routes.js')(routers.staticAssetsRouter);
require('./routers/tweetDataRouter.js')(routers.tweetDataRouter);

module.exports = exports = app;
