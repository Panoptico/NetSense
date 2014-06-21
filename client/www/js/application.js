window.NetSense = Ember.Application.create();
// NetSense.ApplicationAdapter = DS.FixtureAdapter;

NetSense.ApplicationAdapter = DS.RESTAdapter.extend({
  headers: function(){
    return {
      'SESSION_TOKEN': this.get('session.authToken')
    };
  }.property('session.authToken')
});

DS.RESTAdapter.reopen({
  namespace: 'api/v1',
  host: 'http://NetSenseDev.azurewebsites.net'
});

Ember.Inflector.inflector.uncountable('track');
Ember.Inflector.inflector.uncountable('tweet');
Ember.Inflector.inflector.uncountable('user');