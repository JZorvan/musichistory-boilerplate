'use strict';

$(document).ready(function() {

  // hides the Add Music View on load
  $('#purple_block').hide();

  function addToDOM (songs) {
    for (let song in songs) {
      let currentSong = songs[song];
      $("#yellow_block").append(`<h4>${currentSong.title}  |  Performed by: ${currentSong.artist}  |  On the album: ${currentSong.album}</h4>`);
    }
  };

$.ajax({
    url: "https://popping-fire-3812.firebaseio.com/music/.json",
  }).done(function(songs) {
    addToDOM(songs);
  });

  // When Add Music button is clicked, that block is shown, others are hidden
  $('#add_music_view').click(function(e) {
    $('#purple_block').show();
    $('#left_bar').hide();
    $('#yellow_block').hide();
    $('#add_music_view').addClass('active');
    $('#list_music_view').removeClass('active');
  });

  // When List Music button is clicked, those blocks are shown, other is hidden
  $('#list_music_view').click(function(e) {
    $('#purple_block').hide();
    $('#left_bar').show();
    $('#yellow_block').show();
    $('#list_music_view').addClass('active');
    $('#add_music_view').removeClass('active');
  });

  // Gets info from Add Music Form and puts that into the array
  $('#add_btn').click(function(e) {
    let addTitle = $('#title').val();
    let addArtist = $('#artist').val();
    let addAlbum = $('#album').val();
    let newSong = {
      "title": addTitle,
      "artist": addArtist,
      "album": addAlbum
    }
    // songs.push(`${addTitle} - by ${addArtist} on the album ${addAlbum}`);
    // $('#yellow_block').append(`<h4>${addTitle} | Performed by: ${addArtist} | On the album: ${addAlbum}</h4>`);
    $.ajax({
      url: 'https://popping-fire-3812.firebaseio.com/music/.json',
      type: 'POST',
      data: JSON.stringify(newSong)
    }).done(addToDOM(songs));
    $('#title').val('');
    $('#artist').val('');
    $('#album').val('');
  });

});
