const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const songs = require('./song.js');

const AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  albumArt: String,
  songs: [ String ]
});

const Album = mongoose.model('Album',AlbumSchema);

module.exports = Album;
