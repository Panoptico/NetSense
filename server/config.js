var mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    middle     = require('./middleware'),
    cors       = require('cors');

mongoose.connect(process.env.DB_URL);

module.exports = exports = function(app, express, routers) {
  app.set('port', process.env.PORT || 8080);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(bodyParser());
  app.use(cors());
  app.use(express.static(__dirname.substr(0, __dirname.length-7) + '/client/www'));
  app.use('/static/v1', routers.staticAssetsRouter);
  app.use('/tweetdata/v1', routers.tweetDataRouter);
  app.use(middle.logError);
  app.use(middle.handleError);
};
