/*
  NOTE: THE PURPOSE OF THIS FILE IS TO INSERT SAMPLE DATA INTO YOUR DATABASE.
  IT DOES NOT RUN AS PART OF YOUR NORMAL APPLICATION!
  The purpose is to create data in your database so that you have
  something to display on the page while you develop. You only need to run it once.
  The only reason you'd need to run it again is if you changed the sample data.

  You can run this file by typing the following command in the root of your app
  `node seed.js`
*/

var db = require("./models");

var sampleAlbums = [{
  artistName: 'Nine Inch Nails',
  name: 'The Downward Spiral',
  releaseDate: '1994, March 8',
  genres: [ 'industrial', 'industrial metal' ],
  albumArt: 'images/nineinchnails_thedownwardspiral.JPG'
},
{
  artistName: 'Metallica',
  name: 'Metallica',
  releaseDate: '1991, August 12',
  genres: [ 'heavy metal' ],
  albumArt: 'images/metallica_metallica.jpg'
},
{
  artistName: 'The Prodigy',
  name: 'Music for the Jilted Generation',
  releaseDate: '1994, July 4',
  genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ],
  albumArt: 'images/theprodigy_musicforthejiltedgeneration.jpg'
},
{
  artistName: 'Johnny Cash',
  name: 'Unchained',
  releaseDate: '1996, November 5',
  genres: [ 'country', 'rock' ],
  albumArt: 'images/johnnycash_unchained.jpg'
},
{  
  artistName: 'Ladyhawke',
  name: 'Ladyhawke',
  releaseDate: '2008, November 18',
  genres: [ 'new wave', 'indie rock', 'synth pop' ],
  albumArt: 'images/johnnycash_unchained.jpg'
},
{
  artistName: 'The Knife',
  name: 'Silent Shout',
  releaseDate: '2006, February 17',
  genres: [ 'synth pop', 'electronica', 'experimental' ],
  albumArt: 'images/theknife_silentshout.jpg'
},
{
  artistName: 'Juno Reactor',
  name: 'Shango',
  releaseDate: '2000, October 9',
  genres: [ 'electronic', 'goa trance', 'tribal house' ],
  albumArt: 'images/junoreactor_shango.jpg'
},
{
  artistName: 'Philip Wesley',
  name: 'Dark Night of the Soul',
  releaseDate: '2008, September 12',
  genres: [ 'piano' ],
  albumArt: 'images/philipwesley_darknightofthesoul.jpg'
}];

db.Album.remove({}, function(err, albums){

  db.Album.create(sampleAlbums, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });

});
