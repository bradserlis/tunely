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

$(document).ready(function() {
  $albumList = $('#albumTarget');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });

});

function setEventListeners () {
  $('#newAlbumForm').on('submit', function(e) {
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: newAlbumSuccess,
      error: handleError
    })
  });
}

function getAlbumHtml(album) {
  return `<!-- one album -->
          
          <div class="row album">

            <form id="newAlbumForm">
              <fieldset>
                <div class="modal fade" id="modalContactForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                      </ul>
                    </div>
                  </div>
                  <!-- end of album internal row -->
                  <div class='panel-footer'>
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

function handleError(e) {
  $albumList.text('Failed to load albums, is the server working?');
}