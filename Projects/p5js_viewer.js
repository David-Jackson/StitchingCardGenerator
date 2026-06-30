// Run this on the p5.js web editor: https://editor.p5js.org/
// This will generate a preview of your project, good for creating programatic patterns

var project = {}; // INSERT Project JSON here (or function call that returns generated Project JSON, see Star/creationScript.js)

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(220);

  var margin = 5;
  var maxHeight = height - (2* margin);
  var maxWidth = width - (2* margin);

  var scaleMult = min(maxHeight / project.cardHeightMm, maxWidth / project.cardWidthMm);

  console.log(scaleMult);
  
  translate(margin, margin);
  translate((maxWidth - (scaleMult * project.cardWidthMm)) / 2, (maxHeight - (scaleMult * project.cardHeightMm)) / 2);

  scale(scaleMult);

  rect(0,0,project.cardWidthMm,project.cardHeightMm);

  project.paths.forEach(path => path.points.forEach(p => point(p.x, p.y)))
}
