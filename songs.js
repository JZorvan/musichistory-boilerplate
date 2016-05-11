'use strict';

////// Music History 2 /////////////////////////////////////////////////////////////////////////////
// Provided array for Music History 2
var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";

songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

// Add one song to the beginning and one to the end of the array
songs.unshift("Call Me Maybe > by Carly Rae Jepsen on the album Some Crap");
songs.push("Last Friday Night > by Katy Perry on the album Teenage Dream");

// Calls the function to loop through the array replacing characters
charReplacer(songs, '>', '-');
charReplacer(songs, '*', '');
charReplacer(songs, '@', '');
charReplacer(songs, '(', '');
charReplacer(songs, '!', '');

// Loops an array replacing one char w/ another
function charReplacer(array, oldChar, newChar) {
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].replace(oldChar, newChar);
  };
};

// Creates a string for the array
var buildString = '';
function makeAString (array) {
  for (let i = 0; i < array.length; i++) {
    buildString += `<h2>${array[i]}</h2>`;
  };
    return buildString
};
////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {

  // hides the Add Music View on load
  $('#purple_block').hide();

  // Populates the yellow block with the array of songs
  $('#yellow_block').html(makeAString(songs));

  // When Add Music button is clicked, that block is shown, others are hidden
  $('#add_music_view').click(function(e) {
    $('#purple_block').show();
    $('#left_bar').hide();
    $('#yellow_block').hide();
  });

  // When List Music button is clicked, those blocks are shown, other is hidden
  $('#list_music_view').click(function(e) {
    $('#purple_block').hide();
    $('#left_bar').show();
    $('#yellow_block').show();
  });

  // Gets info from Add Music Form and puts that into the array
  $('#add_btn').click(function(e) {
    let addTitle = $('#title').val();
    let addArtist = $('#artist').val();
    let addAlbum = $('#album').val();
    songs.push(`${addTitle} - by ${addArtist} on the album ${addAlbum}`);
    $('#yellow_block').append(`<h2>${addTitle} - by ${addArtist} on the album ${addAlbum}</h2>`)
  });



});
