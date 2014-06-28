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
  host: window.__netsense_url
});

Ember.Inflector.inflector.uncountable('track');
Ember.Inflector.inflector.uncountable('tweet');
Ember.Inflector.inflector.uncountable('user');

NetSense.UserSerializer = DS.RESTSerializer.extend({
  primaryKey: 'twitterUserId'
});

NetSense.TrackSerializer = DS.RESTSerializer.extend({
  primaryKey: 'name'
});

NetSense.TweetSerializer = DS.RESTSerializer.extend({
  primaryKey: 'tweetId'
});
