const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: String,
  trackNumber: Number
});

const Song = mongoose.model('Song',SongSchema);

module.exports = Song;