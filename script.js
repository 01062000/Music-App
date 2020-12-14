import {Music} from './music_data.js';

window.addEventListener('load', () => {

    const audio = document.querySelector('audio');
    const play_btn = document.getElementById('play');
    const next_btn = document.getElementById('next');
    const image = document.getElementById('photo');
    const container = document.getElementById('container');
    const song_name = document.getElementById('song_name');
    const artist_name = document.getElementById('artist_name');

    //console.log(Music[0]);

    let indexOfTheNextSong = 0;
    let isPlaying = false;

    function playMusic(){
        audio.play();
        isPlaying = true;
        play_btn.classList.replace('fa-play-circle', 'fa-pause-circle');
        play_btn.removeAttribute('title');
        play_btn.setAttribute('title', 'pause');
    }

    function pauseMusic(){
        audio.pause();
        isPlaying = false;
        play_btn.classList.replace('fa-pause-circle', 'fa-play-circle');
        play_btn.removeAttribute('title');
        play_btn.setAttribute('title', 'play');
    }

    function playNextSong(){
        indexOfTheNextSong = (indexOfTheNextSong + 1) % Music.length;
        audio.src = Music[indexOfTheNextSong].song_src;
        image.src = Music[indexOfTheNextSong].picture;
        container.style.removeProperty("background");
        container.style.background = `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('${Music[indexOfTheNextSong].picture}')`;
        container.style.backgroundRepeat = "no-repeat";
        container.style.backgroundSize = "100% 100%";
        song_name.innerHTML = Music[indexOfTheNextSong].song_name;
        artist_name.innerHTML = Music[indexOfTheNextSong].artist_name;
        /*console.log(container);*/
    }

    play_btn.addEventListener('click', () => {
        (isPlaying) ? pauseMusic() : playMusic();
    });

    next_btn.addEventListener('click', () => {
        playNextSong();
    });

});