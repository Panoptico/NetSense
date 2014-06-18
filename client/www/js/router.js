NetSense.Router.map(function(){
  this.resource('NetSense', {path: '/'}, function(){

    this.resource('dashboard', {path: '/dashboard'}, function(){
      this.resource('track', {path: '/track/:trackID'}, function(){

        this.resource('tweetMap', {path: '/tweetMap'});
        this.resource('sentimentGraph', {path: '/sentimentGraph'});
      });
    });

    this.route('dashboard');

    this.route('settings');
    this.route('login');
  });
});

NetSense.NetSenseRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('track');
  },
  renderTemplate: function(controller){
    this._super(this, arguments);
    this.render('NetSense/dashboard', {
      outlet: 'ContentView',
      into: 'NetSense'
    });
  }
});

NetSense.DashboardRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('track');
  },
  renderTemplate: function(controller){
    this.render('NetSense/dashboard', {
      outlet: 'ContentView',
      into: 'NetSense',
      controller: controller
    });
  }
});

NetSense.TweetMapRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('tweet');
  },
  renderTemplate: function(controller){
    this.render('NetSense/dashboard/tweetMap', {
      outlet: 'InformationView',
      into: 'NetSense/dashboard',
      controller: controller
    });
  }
});

NetSense.SentimentGraphRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('tweet');
  },
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