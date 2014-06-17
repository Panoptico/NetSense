NetSense.Router.map(function(){
  this.resource('NetSense', {path: '/'}, function(){

    this.resource('dashboard', {path: '/dashboard'}, function(){
      this.route('tweetMap');
      this.route('sentimentGraph');
    });

    this.route('dashboard');

    this.route('settings');
    this.route('login');
  });
});

NetSense.NetSenseRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this._super(this, arguments);
    this.render('NetSense/dashboard', {
      outlet: 'ContentView',
      into: 'NetSense'
    });
  }
});

NetSense.NetSenseDashboardRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/dashboard', {
      outlet: 'ContentView',
      into: 'NetSense',
      controller: controller
    });
  }
});

NetSense.DashboardTweetMapRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/dashboard/tweetMap', {
      outlet: 'InformationView',
      into: 'NetSense/dashboard',
      controller: controller
    });
  }
});

NetSense.DashboardSentimentGraphRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/dashboard/sentimentGraph', {
      outlet: 'InformationView',
      into: 'NetSense/dashboard',
      controller: controller
    });
  }
});

NetSense.NetSenseSettingsRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/settings', {
      outlet: 'ContentView',
      into: 'NetSense',
      controller: controller
    });
  }
});

NetSense.NetSenseLoginRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/login', {
      outlet: 'ContentView',
      into: 'NetSense',
      controller: controller
    });
  }
});