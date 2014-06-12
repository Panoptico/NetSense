var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  twitterId: {
    type: String,
    required: true
  },
  name: String,
  email: String,
  categoriesToFollow: String,
  companyName: String
  //TO DO: Add searchHistory, recentSearches, mostFrequentSearches
});

var Users = mongoose.model('Users', UserSchema);

module.exports = exports = Users;
