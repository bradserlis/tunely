/* CLIENT-SIDE JS
 *
 * You will need this file for doing PUT or DELETE requests.
 * As an example, here is how one might implement a delete button
 * 1. Create a big red button that says delete. Give it an id.
 * 2. Listen for the click event on the button (using the id you made for it).
 * 3. In the function that executes on that click event, make an AJAX request to the server to
 *    delete the album. (Note: you will need the album id as part of the url)
 * 4. Make the route on the server side that accepts this request. Make sure it is getting there.
 * 5. Perform the deletion in the database
 *
 */
var $albumList;
var allAlbums = [];
var songs = [];
// var currentAlbumId;

$(document).ready(function() {
  $albumList = $('#albumTarget');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });
});

// call this when the button on the modal is clicked
function handleNewSongSubmit(currentAlbumId) {
  $('#saveSong').on('click', function(e) {
    e.preventDefault();
    let songName = $('#songName').val();
    let trackNumber = $('#trackNumber').val();
    $.ajax({
      method: 'POST',
      url: `/api/albums/:${currentAlbumId}/songs/:id`,
      data: {songName, trackNumber},
      success: newSongSuccess,
      error: handleError
    })
  });
}

function setEventListeners () {
  // New Album submit button event listener
  $('#newAlbumForm').on('submit', function(e) {
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: newAlbumSuccess,
      error: handleError
    })
  });

  // New Song button event listener
  $('.add-song').on('click', function(e) {
    let currentAlbumId = $(this).parents('.album').data('album-id');
    $('#songModal').data('album-id', currentAlbumId);
    $('#songModal').modal();
    handleNewSongSubmit(currentAlbumId);
  });
}

function buildSongsHtml(songs) {
  let songText = "";
  songs.forEach( (song, index) => {
    if (index < songs.length-1) {
      songText = songText + "(" + song.trackNumber + ") " + song.name + ", ";
    } else {
      songText = songText + "(" + song.trackNumber + ") " + song.name;
    }
  });
  let songsHtml = songText;

  return `<li class="list-group-item">
            <h4 class="inline-header">Songs:</h4>
            <span>${songsHtml}</span>
          </li>`;
};

function getAlbumHtml(album) {
  songs = album.songs;
  return `<!-- one album -->
          
          <div class="row album" data-album-id=${album._id}>

            <form id="newAlbumForm">
              <fieldset>
                <div class="modal fade" id="modalAlbumForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header text-left">
                        <h4 class="modal-title w-100 font-weight-bold" style="display: inline;">Add New Album</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body mx-3">
                        <div class="md-form mb-5">
                          <input type="text" id="name" name="name" class="form-control input-md" required="" placeholder="Album Name">
                        </div>

                        <div class="md-form mb-5">
                          <input type="text" id="textinput" name="artistName" class="form-control input-md" placeholder="Artist Name">
                        </div>

                        <div class="md-form mb-5">
                          <input type="text" id="releaseDate" name="releaseDate" class="form-control input-md" placeholder="Release Date (e.g., 1992)">
                        </div>

                        <div class="md-form">
                            <textarea type="text" id="genres" name="genres" class="form-control" rows="4" placeholder="Genre (e.g., rock, pop, hip hop, etc)"></textarea>
                        </div>
                      </div>
                      <div class="modal-footer d-flex justify-content-center">
                          <button id="formSubmitButton" name="formSubmitButton" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
        
            <div class="col-md-10 col-md-offset-1">
              <div class="panel panel-default">
                <div class="panel-body">
                <!-- begin album internal row -->
                  <div class='row'>
                    <div class="col-md-3 col-xs-12 thumbnail album-art">
                      <img src="${album.albumArt}" alt="album image">
                    </div>
                    <div class="col-md-9 col-xs-12">
                      <ul class="list-group">
                        <li class="list-group-item">
                          <h4 class='inline-header'>Album Name:</h4>
                          <span class='album-name'>${album.name}</span>
                        </li>
                        <li class="list-group-item">
                          <h4 class='inline-header'>Artist Name:</h4>
                          <span class='artist-name'>${album.artistName}</span>
                        </li>
                        <li class="list-group-item">
                          <h4 class='inline-header'>Released date:</h4>
                          <span class='album-releaseDate'>${album.releaseDate}</span>
                        </li>
                        ${buildSongsHtml(songs)}
                      </ul>
                    </div>
                  </div>
                  <!-- end of album internal row -->
                  <div class='panel-footer'>
                    <button class='btn btn-primary add-song'>Add Song</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end one album -->`;
}

function getAllAlbumsHtml(albums) {
  return albums.map(getAlbumHtml).join("");
}

// helper function to render all albums to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing albums from view
  $albumList.empty();

  // pass `allTodos` into the template function
  let albumHtml = getAllAlbumsHtml(allAlbums);

  // append html to the view
  $albumList.append(albumHtml);
  
  setEventListeners();
};

function handleSuccess(json) {
  allAlbums = json;
  render();
}

function newAlbumSuccess (json) {
  $('#newAlbumForm input').val('');
  allAlbums.push(json);
  render();
}

function newSongSuccess (json) {
  $('#songModal input').val('');
  let newSongElement = json.songs.length-1;
  let latestSongId = json.songs[newSongElement]._id;
  let latestSongName = json.songs[newSongElement].name;
  let latestSongTrackNumber = json.songs[newSongElement].trackNumber;
  let indexOfUpdatedAlbum;
  for (let albumElement = 0; albumElement < allAlbums.length; albumElement++) {
    if (allAlbums[albumElement]._id == json._id) {
      indexOfUpdatedAlbum = albumElement;
    }
  };
  allAlbums[indexOfUpdatedAlbum].songs.push({_id: latestSongId, name: latestSongName, trackNumber: latestSongTrackNumber});
  render();
}

function handleError(e) {
  console.log('error:', e);
  $albumList.text('Failed to load albums, is the server working?');
}
