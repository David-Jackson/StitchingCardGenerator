// --- Parameters ---
$fn = 60;              // Smoothness of the circles
plate_thickness = 3;   // Total thickness of the test plate (mm)
border_thickness = 0.6;// How high the colored border goes (e.g., first 3 layers)

hole_min = 0.1;        // Smallest hole diameter (mm)
hole_max = 1.0;        // Largest hole diameter (mm)
step = 0.1;            // Increment between holes (mm)

spacing = 6;           // Distance between hole centers (mm)
margin = 6;            // Margin from the edges (mm)
border_width = 1.2;    // Width of the colored ring around the hole (mm)

chamfer_height = 0.4;  // Height/depth of the entry funnel (mm)
chamfer_extra  = 0.8;  // How much wider the funnel opening is than the hole (mm)

// --- Calculations ---
num_holes = floor((hole_max - hole_min) / step) + 1;
plate_width = (num_holes - 1) * spacing + (margin * 2);
plate_length = margin * 2;

// --- 1. THE MAIN PLATE (Color: Charcoal/Black) ---
color("Charcoal") {
    difference() {
        // Base Plate
        cube([plate_width, plate_length, plate_thickness]);
        
        // Pocket out space for the colored borders, through-holes, and chamfers
        for (i = [0 : num_holes - 1]) {
            current_dia = hole_min + (i * step);
            x_pos = margin + (i * spacing);
            y_pos = plate_length / 2;
            
            // Cut the actual air hole all the way through
            translate([x_pos, y_pos, -0.5])
                cylinder(d = current_dia, h = plate_thickness + 1);
                
            // Pocket out space for the colored borders on the bottom layers
            translate([x_pos, y_pos, -0.1])
                cylinder(d = current_dia + (border_width * 2), h = border_thickness + 0.1);
                
            // Cut the chamfer cone out of the plate (with a small Z-overlap for clean rendering)
            translate([x_pos, y_pos, -0.1])
                cylinder(d1 = current_dia + chamfer_extra, d2 = current_dia, h = chamfer_height + 0.1);
        }
    }
}

// --- 2. THE BORDERS WITH INTEGRATED CHAMFERS (Color: Lime Green) ---
color("LimeGreen") {
    for (i = [0 : num_holes - 1]) {
        current_dia = hole_min + (i * step);
        x_pos = margin + (i * spacing);
        y_pos = plate_length / 2;
        
        translate([x_pos, y_pos, 0]) {
            difference() {
                // Outer ring solid body
                cylinder(d = current_dia + (border_width * 2), h = border_thickness);
                
                // Inner straight hole clearance
                translate([0, 0, -0.5])
                    cylinder(d = current_dia, h = border_thickness + 1);
                
                // Cut the chamfer cone out of the ring as well so they match perfectly
                translate([0, 0, -0.1])
                    cylinder(d1 = current_dia + chamfer_extra, d2 = current_dia, h = chamfer_height + 0.1);
            }
        }
    }
}