'use strict';

$(document).ready(function() {

  var selectedSongID = '';
  var newSong = {};
  var edittedSong = {};

  // Hides the Add Music View on load
  $('#purple_block').hide();

  // **********************
  //        POPULATE
  // **********************

  var populateMyMusic = (music) => {
    for (let song in music) {
      let currentSong = music[song];
      let songStr = '';
      songStr += `<card id=${song}><h4>`;
      songStr += `${currentSong.title} | `;
      songStr += `Perfomed by: ${currentSong.artist} | `;
      songStr += `On the album: ${currentSong.title}</h4>`;
      songStr += `<button class="edit">Edit</button>`;
      songStr += `<button class="delete">Delete</button></card>`;
      $("#yellow_block").append(songStr);
    }
  };

  // **********************
  //           ADD
  // **********************

  // Clears the form values
  var clearAddForm = () => {
    $('#title').val('');
    $('#artist').val('');
    $('#album').val('');
  };

  // Build a new object from fields and calls Firebase function
  var addSong = () => {
    let addTitle = $('#title').val();
    let addArtist = $('#artist').val();
    let addAlbum = $('#album').val();
    newSong = {
      "title": addTitle,
      "artist": addArtist,
      "album": addAlbum
    };
    addSongToFirebase(newSong);
    clearAddForm();
    newSong = {};
  };

  //Decides if the Add Form is being used to add or edit
  var addOrEdit = () => {
    if (selectedSongID === '') {
      addSong();
    } else if (selectedSongID !== '') {
      editSong();
    }
  };

  // Click function on Add Button
  $('#add_btn').click(addOrEdit);

  // **********************
  //          DELETE
  // **********************

  $(document).on("click", ".delete", function () {
    deleteSongFromFirebase($(this).parent().attr("id"));
    $(this).parent().remove();
  });

  // **********************
  //           EDIT
  // **********************

  $(document).on("click", ".edit", function () {
    selectedSongID = $(this).parent().attr("id");
    addMusicView();
  });

  var editSong = () => {
    let addTitle = $('#title').val();
    let addArtist = $('#artist').val();
    let addAlbum = $('#album').val();
    edittedSong = {
      "title": addTitle,
      "artist": addArtist,
      "album": addAlbum
    };
    editSongInFirebase(selectedSongID, edittedSong);
    clearAddForm();
    selectedSongID = '';
    edittedSong = {};
  };

  // **********************
  //         FIREBASE
  // **********************

  var getMusicFromFirebaseAndPopulate = () => {
    $.ajax({
      url: 'https://popping-fire-3812.firebaseio.com/music/.json',
      type: "GET",
    }).done(function(music) {
      $("#yellow_block").html('');
      populateMyMusic(music);
    });
  };

  var addSongToFirebase = (newSong) => {
    $.ajax({
      url: 'https://popping-fire-3812.firebaseio.com/music/.json',
      type: "POST",
      data: JSON.stringify(newSong),
    }).done(function(data){
        getMusicFromFirebaseAndPopulate();
        myMusicView();
    });
  };

  var deleteSongFromFirebase = (songID) => {
    $.ajax({
      url: 'https://popping-fire-3812.firebaseio.com/music/' + songID + '/.json',
      type: "DELETE",
    }).done(function(data){
      getMusicFromFirebaseAndPopulate();
    });
  };

  var editSongInFirebase = (songID, edittedSong) => {
    $.ajax({
      url: 'https://popping-fire-3812.firebaseio.com/music/' + songID + '/.json',
      type: "PUT",
      data: JSON.stringify(edittedSong),
    }).done(function(data){
      getMusicFromFirebaseAndPopulate();
      myMusicView();
    });
  };

  getMusicFromFirebaseAndPopulate();

  // **********************
  //        NAVIGATION
  // **********************

  // Function for showing My Music View
  var myMusicView = () => {
    $('#purple_block').hide();
    $('#left_bar').show();
    $('#yellow_block').show();
    $('#my_music_view').addClass('active');
    $('#add_music_view').removeClass('active');
  };

  // Function for showing Add Music View
  var addMusicView = () => {
    $('#purple_block').show();
    $('#left_bar').hide();
    $('#yellow_block').hide();
    $('#add_music_view').addClass('active');
    $('#my_music_view').removeClass('active');
  };

  // Click event for My Music button
  $('#my_music_view').click(myMusicView);

  // Click event for Add Music button
  $('#add_music_view').click(addMusicView);

});
