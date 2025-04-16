// JavaScript to handle play and pause buttons on the Home page

document.getElementById("playButton").addEventListener("click", function() {
    document.getElementById("audioPlayer").play();
});

document.getElementById("pauseButton").addEventListener("click", function() {
    document.getElementById("audioPlayer").pause();
});
