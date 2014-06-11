module.exports = exports = function(router) {
  router.route('/')
  .get(function(req, res){
    res.redirect('/index.html');
  });

  router.route('/emberTest')
  .get(function(req, res){
    res.redirect('/emberTest.html');
  });
};
