document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progress = document.getElementById('progress');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');

    const songs = [
        {title: 'Song 1', artist: 'Artist 1', src: 'path/to/song1.mp3'},
        {title: 'Song 2', artist: 'Artist 2', src: 'path/to/song2.mp3'},
        {title: 'Song 3', artist: 'Artist 3', src: 'path/to/song3.mp3'}
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    const audio = new Audio();

    function loadSong(song) {
        audio.src = song.src;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
    }

    function playSong() {
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = 'Pause';
    }

    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPercent;
    });

    progress.addEventListener('input', () => {
        const seekTime = (progress.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    loadSong(songs[currentSongIndex]);
});
