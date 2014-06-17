var mongoose = require('mongoose');

var TrackSchema = new mongoose.Schema({
  trackId: {type: Number,
    required: true,
    unique: true
  },
  name: String,
  tweets: [String], //tweet ids
  followers: [String] //user ids
});

var Tracks = mongoose.model('Tracks', TrackSchema);

module.exports = Tracks;

//ToDo: include users and tweets as subdocuments