function setup(){
    let canvas = createCanvas(400,400);
    canvas.parent('projecta');
    background(220);
}

function draw(){
    fill(255,0,0);
    ellipse(mouseX, mouseY, 50);
}