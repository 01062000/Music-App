import {Music} from './music_data.js';

window.addEventListener('load', () => {

    //fetch the element from DOM;
    const audio = document.querySelector('audio');
    const play_btn = document.getElementById('play');
    const next_btn = document.getElementById('next');
    const prev_btn = document.getElementById('prev');
    const image = document.getElementById('photo');
    const container = document.getElementById('container');
    const song_name = document.getElementById('song_name');
    const artist_name = document.getElementById('artist_name');
    const progressMeter = document.querySelector('.progress_meter_mark');
    let current_time = document.querySelector('.current_time');
    let total_duration = document.querySelector('.total_duration');
    const progress_div = document.querySelector('.progress_meter');

    let indexOfTheSong = 0;
    //A flag that indicates whether the song is playing or not
    let isPlaying = false;

    //this set of function will rum each and every four seconds and dynamically change the currentTime and progress-mark
    audio.addEventListener('timeupdate', event => {
        //console.log(event);
        const {currentTime, duration} = event.srcElement;
        //console.log(currentTime);
        //console.log(duration);
        let currentProgress = ( (currentTime / duration) * 100);
        progressMeter.style.width = `${currentProgress}%`;
        //convert the duration from sec to min
        let min_duration = Math.floor(duration / 60);
        let sec_duration = Math.floor(duration % 60);
        //convert the current-time to min
        let min_curret = Math.floor(currentTime / 60);
        let sec_current = Math.floor(currentTime % 60);
        if(sec_current < 10){
            sec_current = `0${sec_current}`;
        }
        if(duration){
            current_time.textContent = `${min_curret} : ${sec_current}`;
            total_duration.textContent = `${min_duration} : ${sec_duration}`;
        }
    });
    //whenever a person from user-end click on the progress-meter the position where he clicked the music will be continue from there.
    progress_div.addEventListener('click', event => {
        let move_progress = (event.offsetX / event.srcElement.clientWidth) * audio.duration;
        audio.currentTime = move_progress;
    });

    //whenever the playing song is ended the next song will be started
    audio.addEventListener('ended', playNextSong);

    //playMusic
    function playMusic(){
        audio.play();
        isPlaying = true;
        play_btn.classList.replace('fa-play-circle', 'fa-pause-circle');
        play_btn.removeAttribute('title');
        play_btn.setAttribute('title', 'pause');
    }
    //pauseMusic
    function pauseMusic(){
        audio.pause();
        isPlaying = false;
        play_btn.classList.replace('fa-pause-circle', 'fa-play-circle');
        play_btn.removeAttribute('title');
        play_btn.setAttribute('title', 'play');
    }
    //set the Music source, photo and background cover photo
    function setMusic(index){
        audio.src = Music[index].song_src;
        image.src = Music[index].picture;
        container.style.removeProperty("background");
        container.style.background = `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('${Music[index].picture}')`;
        container.style.backgroundRepeat = "no-repeat";
        container.style.backgroundSize = "100% 100%";
        song_name.innerHTML = Music[index].song_name;
        artist_name.innerHTML = Music[index].artist_name;
    }
    //play the next song
    function playNextSong(){
        indexOfTheSong = (indexOfTheSong + 1) % Music.length;
        setMusic(indexOfTheSong);
        playMusic();
    }
    //play the prev song
    function playPrevSong(){
        indexOfTheSong = (indexOfTheSong - 1 + Music.length) % Music.length;
        setMusic(indexOfTheSong)
        playMusic();
    }
    //play the music
    play_btn.addEventListener('click', () => {
        (isPlaying) ? pauseMusic() : playMusic();
    });
    //next btn functionality
    next_btn.addEventListener('click', () => {
        playNextSong();
    });
    //prev btn functionality
    prev_btn.addEventListener('click', () => {
        playPrevSong();
    });
});