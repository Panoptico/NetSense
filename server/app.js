var express   = require('express');
var passport  = require('./passport/passport_controllers.js');

var app = express();

var routers = {
  twitterLoginRouter: express.Router(),
  staticAssetsRouter: express.Router(),
  userRouter: express.Router(),
  trackRouter: express.Router(),
  tweetRouter: express.Router()
};

require('./config.js')(app, express, routers, passport);
require('./login/twitterLogin/twitter_login_routes.js')(routers.twitterLoginRouter, passport);
require('./static/static_asset_routes.js')(routers.staticAssetsRouter);
require('./user/user_routes.js')(routers.userRouter);
require('./track/track_routes.js')(routers.trackRouter);
require('./tweet/tweet_routes.js')(routers.tweetRouter);

module.exports = app;
