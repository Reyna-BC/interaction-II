let data;
let rows = [];
let cataID = 0;
let button;
let button2;
let mother;
let music;

let shakeAmount = 0;
const maxShake = 5;
const decayFactor = 0.9;

var c1, c2, c3;

let url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRNU4SyEHA31LIxNq5OahK5735LirleyohckAZxkP5tTrHqWH2UWdV3v4NvNN4_jfDjbbPBfCbZu4l5/pub?gid=0&single=true&output=csv";

function preload() {
  data = loadTable(url, "csv", "header");

  mother = loadImage("240px-Archmother.png");
  music = loadSound("mother.mp3");
}

function setup() {
  createCanvas(800, 900);
  c1 = color(30, 144, 255);
  c2 = color(255);

  // Store whole rows so names and stats stay together.
  for (let i = 0; i < data.getRowCount(); i++) {
    rows.push(data.getRow(i));
  }

  //button = new button(100,300,40,100, stateOne)
}

function draw() {
  background(30, 144, 255);
  // for (var y = 0; y < height; y++) {
  //   n = map(y, 0, height, 0, 1);
  //   let newc = lerpColor(c1, c2, 0.5);
  //   stroke(newc);
  //   line(0, y, width, y);
  // }

  //new gradient
  for (y = 0; y < height; y++){
    stroke(255, 255 - y)
    line(0, height - y, width, height - y);
  }

  if (!music.isPlaying()){
      music.play();
  }


  image(mother, 150, 5, 80, 80);

  //shake
  let xOffset = random(-shakeAmount, shakeAmount);
  let yOffset = random(-shakeAmount, shakeAmount);
  translate(xOffset, yOffset);
  shakeAmount *= decayFactor;

  //sort button
  textAlign(LEFT); //added this to keep the text aligned
  fill(0);
  ellipse(700, 50, 80, 80);
  textFont("LHF Ridgecrest");
  textSize(20);
  fill(255);
  text("Sort", 685, 55);

  //Heading
  fill(255);
  textAlign(CENTER, BASELINE);
  textFont("LHF Ridgecrest");
  textSize(40);
  text("Match Results", 350, 60);

  //rows
  textSize(20);
  text("Souls", 100, 100);
  text("Kills", 210, 100);
  text("Deaths", 320, 100);
  text("Assists", 440, 100);
  text("Player DMG", 580, 100);

  if (cataID == 1 || cataID == 2 || cataID == 3 || cataID == 4 || cataID == 5) {
    //    for (let i = 0; i < rows.length; i++) {
    for (let i = 0; i < 10; i++) {
      let rowData = rows[i];
      let name = rowData.getString("Heroes");
      let x = 50;
      let y = 150 + i * 50;
      let h = 10;
      let w;

      if (cataID == 1) {
        w = map(rowData.getNum("Souls"), 0, 63.9, 0, 600);

        fill(0, 255, 0);
        rect(x, y, w, h);
        text(rowData.getNum("Souls") + "K", x + w + 15, y + h / 5);
      } else if (cataID == 2) {
        w = map(rowData.getNum("Kills"), 0, 19.92, 0, 600);
        fill(255, 165, 0);
        rect(x, y, w, h);
        text(rowData.getNum("Kills") + "K", x + w + 15, y + h / 2);
      } else if (cataID == 3) {
        w = map(rowData.getNum("Deaths"), 0, 16.85, 0, 600);
        fill(146, 0, 10);
        rect(x, y, w, h);
        text(rowData.getNum("Deaths") + "K", x + w + 15, y + h / 2);
      } else if (cataID == 4) {
        w = map(rowData.getNum("Assists"), 0, 22.66, 0, 600);
        fill(255);
        rect(x, y, w, h);
        text(rowData.getNum("Assists") + "K", x + w + 15, y + h / 2);
      } else if (cataID == 5) {
        w = map(rowData.getNum("Player DMG"), 0, 88.6, 0, 600);
        fill(255, 255, 0);
        rect(x, y, w, h);
        text(rowData.getNum("Player DMG") + "K", x + w + 15, y + h / 2);
      }

      fill(255);
      textAlign(LEFT, BASELINE);
      textFont("LHF Ridgecrest");
      textSize(16);
      text(name, x, y - 5);
    }
  }
}

function mousePressed() {
  // Click Souls to shuffle and display Souls bars.
  if (mouseX > 78 && mouseX < 123 && mouseY > 91 && mouseY < 98) {
    rows = shuffle(rows);
    //this sorts
    // rows.sort((a, b) => b.getNum("Souls") - a.getNum("Souls"));
    cataID = 1;
  }

  // Click Kills to display Kills bars.
  else if (mouseX > 191 && mouseX < 228 && mouseY > 84 && mouseY < 100) {
    //this sorts
    //rows.sort((a, b) => b.getNum("Kills") - a.getNum("Kills"));
    rows = shuffle(rows);
    shakeAmount = maxShake;
    cataID = 2;
  } else if (mouseX > 291 && mouseX < 347 && mouseY > 86 && mouseY < 100) {
    rows = shuffle(rows);
    cataID = 3;
  } else if (mouseX > 410 && mouseX < 466 && mouseY > 89 && mouseY < 101) {
    rows = shuffle(rows);
    cataID = 4;
  } else if (mouseX > 533 && mouseX < 627 && mouseY > 88 && mouseY < 100) {
    rows = shuffle(rows);
    cataID = 5;
  }

  /// Sort Button Code ///
  sortButton();
}

function sortButton() {
  if (
    cataID == 1 &&
    mouseX > 659 &&
    mouseX < 738 &&
    mouseY > 14 &&
    mouseY < 89
  ) {
    rows.sort((a, b) => b.getNum("Souls") - a.getNum("Souls"));
  } else if (
    cataID == 2 &&
    mouseX > 659 &&
    mouseX < 738 &&
    mouseY > 14 &&
    mouseY < 89
  ) {
    rows.sort((a, b) => b.getNum("Kills") - a.getNum("Kills"));
  } else if (
    cataID == 3 &&
    mouseX > 659 &&
    mouseX < 738 &&
    mouseY > 14 &&
    mouseY < 89
  ) {
    rows.sort((a, b) => b.getNum("Deaths") - a.getNum("Deaths"));
  } else if (
    cataID == 4 &&
    mouseX > 659 &&
    mouseX < 738 &&
    mouseY > 14 &&
    mouseY < 89
  ) {
    rows.sort((a, b) => b.getNum("Assists") - a.getNum("Assists"));
  } else if (
    cataID == 5 &&
    mouseX > 659 &&
    mouseX < 738 &&
    mouseY > 14 &&
    mouseY < 89
  ) {
    rows.sort((a, b) => b.getNum("Player DMG") - a.getNum("Player DMG"));
  }
}
