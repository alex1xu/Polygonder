module export() {
	minkowski() { cube([1,1,2],center=true); } //Rectangle
	minkowski() { sphere(r=1,$fn=40); } //Sphere
	minkowski() { cylinder(h=2,r1=1,r2=1,$fn=40,center=true); } //Cylinder
	minkowski() { cylinder(2,2,0,$fn=4,center=true); } //Pyramid
	minkowski() { cylinder(2,2,1,$fn=4,center=true); } //Kilo
	minkowski() { cylinder(1.5,1.5,1.5,$fn=3,center=true); } //Cheese
	minkowski() { union() { rotate([0,45,0]) { cube([2,1,1],center=true); } rotate([0,-45,0]) { cube([2,1,1],center=true); } } } //Cross
	minkowski() { union() { translate([-0.5,-0.5,0]) { cube([0.5,0.5,0.5],center=true); } translate([0.5,-0.5,0]) { cube([0.5,0.5,0.5],center=true); } translate([-0.5,0.5,0]) { cube([0.5,0.5,0.5],center=true); } translate([0.5,0.5,0]) { cube([0.5,0.5,0.5],center=true); } } } //Dots
}
