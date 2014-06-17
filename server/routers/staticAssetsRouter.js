var databaseHelpers = require('../../db/databaseHelpers.js');
var authHelpers = require('../authHelpers.js');

module.exports = function(router) {
  router.route('/emberTest')
  .get(function(req, res){
    res.redirect('/emberTest.html');
  });
};
