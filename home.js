let img;

const myAudio = new Audio('post.mp3');

function preload() {
    img = loadImage('images/background.png');
}

function createCanvas() {
    background(img);
    
}

function playSound(){
    myAudio.play();
}