function polar2cartesian(r, theta) {
    return {x: r * Math.cos(theta), y: r * Math.sin(theta)};
}

function offset(pos, dx, dy) {
    return {x: pos.x + dx, y: pos.y + dy};
}

function getRandomRedHex() {
    const r = (Math.floor(Math.random() * 106) + 150).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 51).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 51).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
}

function getRandomGreenHex() {
    const g = (Math.floor(Math.random() * 106) + 150).toString(16).padStart(2, '0');
    const r = Math.floor(Math.random() * 51).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 51).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
}

function getRandomBlueHex() {
    const b = (Math.floor(Math.random() * 106) + 150).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 51).toString(16).padStart(2, '0');
    const r = Math.floor(Math.random() * 51).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
}

function newProject() {
    return {
      "version": "2.1",
      "cardWidthMm": 108,
      "cardHeightMm": 141,
      "holeDiameter": 1.5,
      "gridSpacing": 5,
      "paths": []
    };
}

function newLayer(colorFunction=getRandomRedHex) {
    return {
      "id": "path-" + new Date().getTime(),
      "name": "Standard Outline",
      "points": [],
      "closed": true,
      "visible": true,
      "color": colorFunction()
    }
}

function interpolateBetween(p1, p2, pointCount) {
    var dx = (p2.x - p1.x) / (pointCount-1);
    var dy = (p2.y - p1.y) / (pointCount-1);
    var res = new Array(pointCount).fill({});
    return res.map((pt, i) => { return {x: p1.x + (i * dx), y: p1.y + (i * dy)}})
}

function star2() {
  
    var numberOfSides = 16;
  
    function getStarPoint(i) {
      var angle = i * (360/numberOfSides) * Math.PI / 180;
      var r = (i % 2 == 0) ? 32 : 50;
      return polar2cartesian(r, angle);
    }
  
    var project = newProject();

    for (var i = 0; i < numberOfSides; i++) {
      var angle = i * (360/numberOfSides) * Math.PI / 180;
      var r = (i % 2 == 0) ? 32 : 50;

      var spt = getStarPoint(i);
      var nextSpt = getStarPoint(i + 1);

      var layer = newLayer();
      
      if (r == 32) {
        layer.points.push(...interpolateBetween(spt, {x:0,y:0},9));
      }

      layer.points.push(...interpolateBetween(spt, nextSpt, 9));
      
      layer.points.push(polar2cartesian(r, angle));
      
      project.paths.push(layer);
    }

    
    for (var i = 0; i < project.paths.length; i++) {
        project.paths[i].points = project.paths[i].points.map(x => offset(x, 108/2, 141/2));
    }
  
    console.log(project);
    return project;
}

var project = star2();
