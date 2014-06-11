var express = require('express');

var app = express();
var routers = {
  staticAssetsRouter: express.Router()
};

require('./config.js')(app, express, routers);
require('./staticAssetsRouter.js')(routers.staticAssetsRouter);

module.exports = exports = app;
