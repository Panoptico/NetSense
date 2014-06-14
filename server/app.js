var express = require('express');

var app = express();
var routers = {
  staticAssetsRouter: express.Router(),
  tweetDataRouter: express.Router()
};

require('./config.js')(app, express, routers);
require('./routers/staticAssetsRouter.js')(routers.staticAssetsRouter);
require('./routers/tweetDataRouter.js')(routers.tweetDataRouter);

module.exports = exports = app;
