
let data;
let heroes = [];
let king;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl9bMSpmK-aguiskU3iBqnyOtyY_p3TdlnfcgVVE1xznAeoi0uTAvEOmUs1JsSokSO9RznLPzjXuLr/pub?gid=0&single=true&output=csv";

let chartWidth = 700;
let rowHeight = 52;
let topMargin = 125;
let barHeight = 18;
let hoveredHero = -1;
const myAudio = new Audio('king.mp3');



function preload() {
  data = loadTable(url, "csv", "header");
}

function setup() {
  if (!data) {
    createCanvas(800, 400);
    noLoop();
    return;
  }

  // Read hero names and pick rates from the spreadsheet
  for (let i = 0; i < data.getRowCount(); i++) {
    let name = data.getString(i, "Heros");
    let rateText = data.getString(i, "Win Rate");

    // Supports values such as 12.5 or "12.5%"
    let rate = parseFloat(rateText.replace("%", ""));

    if (name && Number.isFinite(rate)) {
      heroes.push({
        name: name,
        rate: rate
      });
    }
  }

  // Put the highest pick rate first
  heroes.sort((a, b) => b.rate - a.rate);

  // Make the canvas tall enough for all heroes
  createCanvas(900, max(400, topMargin + heroes.length * rowHeight + 60));

  textFont("Arial");
}

function draw() {
  background(17, 20, 32);

  // Title
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(30);
  textStyle(BOLD);
  text("HERO WIN RATE", 40, 42);

  // Subtitle
  textStyle(NORMAL);
  textSize(13);
  fill(160, 170, 190);
  text("Compare the win rates of each hero.", 40, 72);

  // Chart header
  textSize(12);
  fill(130, 145, 170);
  text("HERO", 40, 105);
  text("WIN RATE", 200, 105);

  if (heroes.length === 0) {
    fill(255);
    textSize(18);
    text("No data found. Check your CSV and column names.", 40, 160);
    return;
  }

  // Calculate the largest win rate for the chart scale
  let maxRate = max(1, ...heroes.map(hero => hero.rate));

  // Draw bars and labels
  for (let i = 0; i < heroes.length; i++) {
    let hero = heroes[i];
    let y = topMargin + i * rowHeight;
    let barX = 200;
    let barMaxWidth = chartWidth - barX - 50;
    let barWidth = map(hero.rate, 0, maxRate, 0, barMaxWidth);

    // Highlight the row under the mouse
    let isHovered =
      mouseX >= barX &&
      mouseX <= barX + barMaxWidth &&
      mouseY >= y - 15 &&
      mouseY <= y + 25;

    if (isHovered) {
      hoveredHero = i;
      noStroke();
      fill(40, 47, 68);
      rect(25, y - 20, 820, 42, 8);
    }

    // Hero name
    fill(isHovered ? 255 : 205, isHovered ? 255 : 215, 235);
    textSize(13);
    textAlign(LEFT, CENTER);
    text(hero.name, 40, y);

    // Bar background
    noStroke();
    fill(42, 48, 65);
    rect(barX, y - barHeight / 2, barMaxWidth, barHeight, 5);

    // Bar fill
    if (isHovered) {
      fill(35,207,144);
    } else {
      fill(11,128,85);
    }

    rect(barX, y - barHeight / 2, barWidth, barHeight, 5);

    // Pick rate label
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(12);
    text(hero.rate + "%", barX + barWidth + 10, y);
  }

  // Footer
  fill(125, 140, 165);
  textSize(12);
  textAlign(LEFT, CENTER);
  text("Total heroes: " + heroes.length, 40, height - 25);

  hoveredHero = -1;
}
