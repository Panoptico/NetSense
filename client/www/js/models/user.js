NetSense.User = DS.Model.extend({
 twitterUserId: DS.attr('string'),
 name: DS.attr('string'),
 email: DS.attr('string'),
 privateTracks: DS.hasMany('track', {async: true}),
 companyName: DS.attr('string'),
 // tracks: DS.attr('string')
 tracks: DS.hasMany('track', {async: true})
});
