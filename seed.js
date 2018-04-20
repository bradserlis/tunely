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
   artistName: 'Ladyhawke',
   name: 'Ladyhawke',
   releaseDate: '2008, November 18',
   genres: [ 'new wave', 'indie rock', 'synth pop' ]
 },
 {
   artistName: 'The Knife',
   name: 'Silent Shout',
   releaseDate: '2006, February 17',
   genres: [ 'synth pop', 'electronica', 'experimental' ]
 },
 {
   artistName: 'Juno Reactor',
   name: 'Shango',
   releaseDate: '2000, October 9',
   genres: [ 'electronic', 'goa trance', 'tribal house' ]
 },
 {
   artistName: 'Philip Wesley',
   name: 'Dark Night of the Soul',
   releaseDate: '2008, September 12',
   genres: [ 'piano' ]
 }];

db.Album.remove({}, function(err, albums){

  db.Album.create(sampleAlbums, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });

});

var SongSchema = new Schema({
  name: String,
  trackNumber: Number,
});

var sampleSongs = [];

sampleSongs.push({ name: 'Swamped',trackNumber: 1
});
sampleSongs.push({ name: "Heaven's a Lie",
                   trackNumber: 2
});
sampleSongs.push({ name: 'Daylight Dancer',
                   trackNumber: 3
});
sampleSongs.push({ name: 'Humane',
                   trackNumber: 4
});
sampleSongs.push({ name: 'Self Deception',
                   trackNumber: 5
});
sampleSongs.push({ name: 'Aeon',
                   trackNumber: 6
});
sampleSongs.push({ name: 'Tight Rope',
                   trackNumber: 7
});

