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

function star() {
    var stationaryPoint = {r: 42, dTheta: -(360/6/2) * Math.PI / 180};
    var layers = [];
    // Inner Star
    for (var i = 1; i <= 5; i++) {
        var layer = newLayer();
        var yPos = 30 - (5 * i);
        for (var angle = 0; angle < 360; angle = angle + (360/6)) {
            var theta = 2 * Math.PI * (angle+90) / 360;
            layer.points.push(polar2cartesian(stationaryPoint.r, theta + stationaryPoint.dTheta))
            layer.points.push(polar2cartesian(yPos, theta));
        }
        layers.push(layer);
    }
    
    // Outer Star
    var stationaryPoint = {r: 54, dTheta: -(360/6/2) * Math.PI / 180};
    for (var i = 1; i <= 5; i++) {
        var layer = newLayer(getRandomBlueHex);
        var yPos = 40 - (5 * i);
        for (var angle = 0; angle < 360; angle = angle + (360/6)) {
            var theta = 2 * Math.PI * (angle) / 360;
            layer.points.push(polar2cartesian(stationaryPoint.r, theta + stationaryPoint.dTheta))
            layer.points.push(polar2cartesian(yPos, theta));
        }
        layers.push(layer);
    }
    
    for (var i = 0; i < layers.length; i++) {
        layers[i].points = layers[i].points.map(x => offset(x, 108/2, 141/2));
    }
    var project = newProject();
    project.paths = layers;
    console.log(project);
}

star();