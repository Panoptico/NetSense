NetSense.User = DS.Model.extend({
 twitterUserId: DS.attr('string'),
 name: DS.attr('string'),
 email: DS.attr('string'),
 privateTracks: DS.hasMany('track'),
 companyName: DS.attr('string'),
 tracks: DS.attr('string')
});
