NetSense.Router.map(function(){
  this.resource('NetSense', {path: '/'}, function(){
    this.route('dashboard');
  });
});

NetSense.NetSenseDashboardRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/dashboard', {
      controller: controller
    });
  }
});
