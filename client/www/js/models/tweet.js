NetSense.Tweet = DS.Model.extend({
 createdAt: DS.attr('string'),
 latitude: DS.attr('number'),
 longitude: DS.attr('number'),
 sentimentScore: DS.attr('number')
});
