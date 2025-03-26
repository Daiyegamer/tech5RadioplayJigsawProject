document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audioPlayer");
    const playButton = document.getElementById("playButton");
    const pauseButton = document.getElementById("pauseButton");
    
    playButton.addEventListener("click", function() {
        audioPlayer.play();
    });
    
    pauseButton.addEventListener("click", function() {
        audioPlayer.pause();
    });
});

