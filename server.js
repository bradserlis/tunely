// SERVER-SIDE JAVASCRIPT
//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
const bodyParser = require('body-parser');

// set EJS as our view engine. This allows us to make dynamic pages.
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
// serve static files from public folder
app.use(express.static(__dirname + '/public'));

const db = require('./models');

/************
 * DATABASE *
 ************/

/*
HARD-CODED DATA
What we've done here is mocked up what a database object would hypothetically look like
if we had one. That's why we've included an idea. We're trying to simulate the data so that
when we do hook up the database later, it's a seamless transition.

First get your routes hooked up and the ejS looking the way you want. When you are
ready to proceed with hooking up the database, go to ./models/album to create a schema.
Then, take a look into the seed.js file to populate some starter data.
*/

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints: This means we are expecting an HTML or EJS page to be rendered
 */

app.get('/', function homepage (req, res) {
    res.render('index');
});

app.get('/api/albums', function (req, res) {
  db.Album.find(function (err, albums){
    res.json(albums);
  });
});

// TODO: GET ROUTE for single album (Route has an id in the url. e.g., /:id that can be accessed
// on the request object with req.params.id).

// TODO: POST ROUTE (NOTE: You can submit a post request directly from an HTML form tag
// using the method and action attributes - no need for AJAX!)
app.post('/api/albums', function (req, res) {
  let genreGrabber = req.body.genres;
  let genreArr = genreGrabber.split(',');
  for (let i = 0; i < genreArr.length; i++) {
    genreArr[i] = genreArr[i].trim();
  };
  let defaultAlbumArt = 'http://placehold.it/800x800';
  let newAlbum = new db.Album({name:req.body.name, artistName:req.body.artistName, releaseDate:req.body.releaseDate, genres:genreArr, albumArt: defaultAlbumArt});
  newAlbum.save();
  res.json(newAlbum);
});

app.post('/api/albums/:album_id/songs/:song_id', function (req, res) {
  let newSong = new db.Song({name: req.body.songName, trackNumber: req.body.trackNumber})
  newSong.save();
  let albumId = req.params.album_id.slice(1, req.params.album_id.length);
  db.Album.findByIdAndUpdate(
    albumId,
    {$push: {songs: newSong}},
    { 'new': true },
    function (err, album) {
      if (err) {
        console.log('Error adding new song to db', err)
      };
      res.json(album);
    })
})

app.get('/profile', function (req, res) {
  // find the user currently logged in
  User.findOne({_id: req.session.userId}, function (err, currentUser) {
    res.render('profile', {user: currentUser})
  });
});

/*
 * JSON API Endpoints: This usually means AJAX has been used to call this route
 */

// TODO: DELETE ROUTE (removes/destroys an album in the DB. Needs to be called from AJAX.)

// TODO: PUT ROUTE (edits/updates the info in the DB. Needs to be called from AJAX.)

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000);
