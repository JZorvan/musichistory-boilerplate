"use strict";
//Variables
var yellowBlock = document.getElementById("yellow_block");

// Provided array for exercise
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
//Call the function to push the array to the DOM
PushToDOM(songs);

// FUNCTIONS

// Loops an array replacing one char w/ another
function charReplacer(array, oldChar, newChar) {
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].replace(oldChar, newChar);
  };
};

// Injects the song array into the DOM
function PushToDOM (array) {
  let buildString = '';
  for (let i = 0; i < array.length; i++) {
    buildString = `<h2>${array[i]}</h2>`;
    yellowBlock.innerHTML += buildString;
  };
};

