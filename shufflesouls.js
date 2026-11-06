let data;
//let souls;
let shuffleSouls;
let url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRNU4SyEHA31LIxNq5OahK5735LirleyohckAZxkP5tTrHqWH2UWdV3v4NvNN4_jfDjbbPBfCbZu4l5/pub?gid=0&single=true&output=csv";
let cataID = 0;
let headerID = 0;

let rows = [];
let names = [];
let souls = [];

function setup() {
  createCanvas(800, 2050);
}

function preload() {
  data = loadTable(url, "csv", "header");
}

function draw() {
  background(30, 144, 255);

  fill(255);
  textAlign(CENTER);
  textSize(14);
  text("Souls", 100, 50);
  text("Kills", 170, 50);
  text("Deaths", 240, 50);
  text("Assists", 320, 50);
  text("Player Dmg", 400, 50);

  //console.log(mouseX, mouseY);

  if (data) {
    let numRows = data.getRowCount();
    // souls = data.getColumn("Souls");
    // shuffleSouls = souls;
    // let names = data.getColumn("Heroes");
    // let kills = data.getColumn("Kills");

    for (let i = 0; i < numRows; i++) {
      let rowData = data.getRow(i);
      // names.push(rowData.getString("Heroes"));
      // souls.push(rowData.getString("Souls"));
      //console.log(souls);
    }

    if (cataID == 1) {
      for (let i = 0; i < numRows; i++) {
        let x = 50;
        let y = 100 + i * 50;
        let w = shuffleSouls[i];
        let h = 10;

        let wMap = map(shuffleSouls[i], 0, 66, 0, 600);
        fill(255);
        rect(x, y, wMap, h);

        textAlign(LEFT);
        fill(255, 255, 255);
        textSize(14);
        text(names[i], x, y - 5);
      }
    } else if (cataID == 2) {
      for (let i = 0; i < numRows; i++) {
        let x = 50;
        let y = 100 + i * 50;
        let w = kills[i];
        let h = 10;

        rect(x, y, w, h);

        textAlign(LEFT);
        fill(255, 255, 255);
        textSize(14);
        text(names[i], x, y - 5);
      }
    }
  }
}

function mousePressed() {
  if (mouseX > 86 && mouseX < 116 && mouseY > 43 && mouseY < 125) {
    shuffleSouls = shuffle(souls, true);
    cataID = 1;
  }

  console.log(shuffleSouls);
}
