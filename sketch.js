let data;

let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl9bMSpmK-aguiskU3iBqnyOtyY_p3TdlnfcgVVE1xznAeoi0uTAvEOmUs1JsSokSO9RznLPzjXuLr/pub?gid=0&single=true&output=csv";

function setup() {
  createCanvas(800, 2000);
}

function preload() {
  data = loadTable(url, "csv", "header");
  console.log(data);
}

function draw() {
  background(0);

  if (data) {
    let numRows = data.getRowCount();
      let wins = data.getColumn("Pick Rate");
      let names = data.getColumn("Heros");



    for (let i = 0; i < numRows; i++) {
      let x = 50;
      let y = 100 + i * 50;
      let w = wins[i];
      let h = 10;
        
      let wMap = map(wins[i], 0,  54, 0, 700);
      fill(255);
      rect(x, y, wMap, h);

      textAlign(LEFT);
      fill(80,90,210);
      text(names[i], x, y - 5);

      textAlign(CENTER);
      text("Pick Rate", width / 2, 50);
    }
  }
}

