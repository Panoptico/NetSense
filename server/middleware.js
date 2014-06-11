module.exports = exports = {
  logError: function(err, req, res, next) {
    if (err) {
      console.error(err);
      return next(err);
    }
    next();
  },

  handleError: function(err, req, res, next) {
    if (err) {
      res.send(err, 500);
    }
  }
};
