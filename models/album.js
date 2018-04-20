const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Song = require('./song.js')


const AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ],
  albumArt: String,
  songs: [ Song.schema ]
});

const Album = mongoose.model('Album',AlbumSchema);

module.exports = Album;
