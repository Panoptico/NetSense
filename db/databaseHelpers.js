var Q = require('q');

module.exports = {
  getFromDB: function(model, next, options) {
    options = options || {};
    var $promise = Q.nbind(model.find, model);

    $promise(options)
    .then(function(databaseData) {
      next(databaseData);
    })
    .fail(function(reason) {
      next(reason);
    });
  },

  postToDB: function(model, next, data) {
    var $promise = Q.nbind(model.create, model);
    
    $promise(data)
    .then(function(postedData) {
      next(postedData);
    })
    .fail(function(reason) {
      next(reason);
    });
  }
};
