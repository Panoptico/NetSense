var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  twitterUserId: {
    type: String,
    required: true,
    unique: true
  },
  twitterHandle: String,
  name: String,
  email: String,
  tracks: [String],
  companyName: String
  //TO DO: Add searchHistory, recentSearches, mostFrequentSearches
});

var Users = mongoose.model('Users', UserSchema);

module.exports = exports = Users;
