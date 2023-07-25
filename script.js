// // song-details
// let song_pic = document.querySelector(".song-pic");
// let song_name = document.querySelector(".song-name");
// let song_artist = document.querySelector(".song-artist");

// song-controls
// let playpause_btn = document.querySelector(".playpause-song");
// let next_btn = document.querySelector(".next-song");
// let prev_btn = document.querySelector(".prev-song");
// let seek_slider = document.querySelector(".seek_slider");

// // volume-control
// let volume_slider = document.querySelector(".volume_slider");

// // time-and-duration
// let curr_time = document.querySelector(".current-time");
// let total_duration = document.querySelector(".total-duration");

// // Define the songs that have to be played
// let song_list = [
//   {
//     name: "Night Owl",
//     artist: "Broke For Free",
//     image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
//     path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
//   },
//   {
//     name: "Enthusiast",
//     artist: "Tours",
//     image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
//     path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
//   },
//   {
//     name: "Shipping Lanes",
//     artist: "Chad Crouch",
//     image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
//     path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
//   },
// ];

// let song_index = 0; //index ranges from 0 to song_list.length - 1
// let isPlaying = false;
// let updateTimer;

// Create new audio element
// let curr_song = document.createElement('audio');

// function loadSong(song_index) {
//   // clearInterval(updateTimer);
//   resetValues(); //reset duration and slider
//   curr_song.src = song_list[song_index].path;
//   curr_song.load();

//   song_pic.style.backgroundImage = "url(" + song_list[song_index].image + ")";
//   song_name.textContent = song_list[song_index].name;
//   song_artist.textContent = song_list[song_index].artist;

//   updateTimer = setInterval(seekUpdate, 1000); // ==> setInterval calls the seekUpdate function every 1000 milliseconds(1 second)
//   //setInterval(function, interval-duration-in-milliseconds)

//   curr_song.addEventListener("ended", nextSong); //automatically play the next song
// }

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// loadSong(song_index);

// function playpauseSong() {
//   if (!isPlaying){
//     playSong();
//   }
//   else{
//     pauseSong();
//   }
// }

// function playSong() {
//   curr_song.play();
//   isPlaying = true;
//   playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
// }

// function pauseSong() {
//   curr_song.pause();
//   isPlaying = false;
//   playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
// }

// function nextSong() {
//   if (song_index < song_list.length - 1){
//     song_index += 1;
//   }
//   else{
//     song_index = 0; //play in circular manner
//   }
//   loadSong(song_index);
//   playSong(); //automatically play the song as soon as it is loaded
// }

// function prevSong() {
//   if (song_index > 0){
//     song_index -= 1;
//   }
//   else{
//     song_index = song_list.length - 1; //play in circular manner
//   }
//   loadSong(song_index);
//   playSong();
// }

function seekTo() { // activated when user changes the seek slider
  let seekto = curr_song.duration * (seek_slider.value / 100); // seek slider value is from 0 to 1
  // console.log("duration: " + curr_song.duration); //gives the duration of the song in seconds
  curr_song.currentTime = seekto;
}

function adjustVolume() {
  curr_song.volume = volume_slider.value / 100; // volume is from 0 to 1
  // console.log(curr_song.volume);
}

function seekUpdate() { // called automatically to move slider & update currentTime every second
  let seekPosition = 0;

  if (!isNaN(curr_song.duration)) {
    //update slider
    seekPosition = curr_song.currentTime * (100 / curr_song.duration);
    seek_slider.value = seekPosition;

    //update currtime & duration
    let currentMinutes = Math.floor(curr_song.currentTime / 60); //currTime is always in seconds
    // let currentSeconds = Math.floor(curr_song.currentTime - currentMinutes * 60);
    let currentSeconds = Math.floor(curr_song.currentTime %  60);
    
    let durationMinutes = Math.floor(curr_song.duration / 60);
    // let durationSeconds = Math.floor(curr_song.duration - durationMinutes * 60);
    let durationSeconds = Math.floor(curr_song.duration % 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}