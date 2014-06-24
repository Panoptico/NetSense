NetSense.Track = DS.Model.extend({
  name: DS.attr('string'),
  tweets: DS.hasMany('tweet', {async: true})
});
