module export() {
	minkowski() { rotate([90,45,90]) cube([1,1,4],center=true); } //0-Rectangle
	minkowski() { sphere(r=4,$fn=40); } //1-Sphere
	minkowski() { rotate([90,90,45]) cylinder(h=2,r1=1,r2=1,$fn=40,center=true); } //2-Cylinder
	minkowski() { rotate([135,135,135]) cylinder(5,5,0,$fn=4,center=true); } //3-Pyramid
	minkowski() { rotate([135,135,45]) cylinder(4,4,1,$fn=4,center=true); } //4-Kilo
	minkowski() { rotate([135,135,45]) cylinder(2.5,2.5,2.5,$fn=3,center=true); } //5-Cheese
	minkowski() { rotate([45,0,0]) union() { cube([2,1,1],center=true); rotate([0,90,0]) { cube([2,1,1],center=true); }; } } //6-Cross
	minkowski() { rotate([135,135,135]) union() { cylinder(h=3, r1=3, r2=0, $fn=4); rotate([0,0,45]) cylinder(h=3, r1=3, r2=0, $fn=4); mirror([0,0,1]) { cylinder(h=3, r1=3, r2=0, $fn=4); rotate([0,0,45]) cylinder(h=3, r1=3, r2=0, $fn=4); } }; } //7-Gem
}
