NetSense.User.FIXTURES = [
  {
    id: 1,
    twitterUserId: 'USERID!98135084020',
    name: 'Bob',
    email: 'bob@bob.com',
    tracks: [1, 2, 3],
    companyName: 'ThisIsARealCompany'
  }
];

NetSense.Tweet.FIXTURES = [
  {
    id: 1,
    createdAt: 'June 16, 2014',
    latitude: 37,
    longitude: 120,
    sentimentScore: 5
  },
  {
    id: 2,
    createdAt: 'June 15, 2014',
    latitude: 43,
    longitude: 18,
    sentimentScore: -3
  },
  {
    id: 3,
    createdAt: 'June 14, 2014',
    latitude: 86,
    longitude: -67,
    sentimentScore: 18
  }
];

NetSense.Track.FIXTURES = [
  {
    id: 1,
    name: 'HAXORREACTORZ',
    tweets: [1, 2, 3]
  },
  {
    id: 2,
    name: '^_^',
    tweets: [2]
  },
  {
    id: 3,
    name: 'TheSymbolFormerllyKnownAsATrack',
    tweets: [2, 3]
  }
];