# PRIMITIVE SHAPES
from random import randrange
RANDRANGE=4

def programScad(genName,commands,filenames):
  f = open("{filename}.scad".format(filename=genName), "w")
  f.write("module export() {\n")

  for command,filename in zip(commands,filenames):
    f.write("\t")
    f.write(command)
    f.write(" //{filename}\n".format(filename=filename))

  f.write("}\n")
  f.close()

def combineShapes(commands):
  filename=""
  shapes=[]
  for command in commands:
    shapes.append(command())
    if command is getCheese: filename+="Cheese"
    if command is getPyramid: filename+="Pyramid"
    if command is getKilo: filename+="Kilo"
    if command is getCylinder: filename+="Cylinder"
    if command is getRect: filename+="Rectangle"
    if command is getCross: filename+="Cross"
    if command is getSphere: filename+="Sphere"
    if command is getDots: filename+="Dots"
  
  return (filename,"minkowski() {{ {shapes} }}".format(shapes=" ".join(shapes)))

def getCheese(x=randrange(RANDRANGE)+1.5):
  return "cylinder({x},{x},{x},$fn=3,center=true);".format(x=x)

def getPyramid(x=randrange(RANDRANGE)+2):
  return "cylinder({x},{x},0,$fn=4,center=true);".format(x=x)

def getKilo(x=randrange(RANDRANGE)+2):
  return "cylinder({x},{x},1,$fn=4,center=true);".format(x=x)

def getCylinder(x=randrange(RANDRANGE)+2,type=randrange(RANDRANGE)):
  if type==0:
    return "cylinder(h={x},r1=1,r2=1,$fn=40,center=true);".format(x=x)
  if type==1:
    return "rotate([0,90,0]) cylinder(h={x},r1=1,r2=1,$fn=40,center=true);".format(x=x)
  if type==2:
    return "rotate([90,0,0]) cylinder(h={x},r1=1,r2=1,$fn=40,center=true);".format(x=x)
  if type==3:
    return "rotate([45,45,0]) cylinder(h={x},r1=1,r2=1,$fn=40,center=true);".format(x=x)
  
def getRect(x=randrange(RANDRANGE)+2,type=randrange(RANDRANGE)):
  if type==0:
    return "cube([1,1,{x}],center=true);".format(x=x)
  if type==1:
    return "cube([{x},1,1],center=true);".format(x=x)
  if type==2:
      return "cube([1,{x},1],center=true);".format(x=x)
  if type==3:
      return "rotate([45,45,0]) cube([1,1,{x}],center=true);".format(x=x)

def getCross(x=randrange(RANDRANGE)+2,type=randrange(RANDRANGE)):
  if type==0:
    return "union() {{ rotate([0,45,0]) {{ cube([{x},1,1],center=true); }} rotate([0,-45,0]) {{ cube([{x},1,1],center=true); }} }}".format(x=x)
  if type==1:
    return "union() {{ rotate([0,0,45]) {{ cube([{x},1,1],center=true); }} rotate([0,0,-45]) {{ cube([{x},1,1],center=true); }} }}".format(x=x)
  if type==2:
    return "union() {{ cube([{x},1,1],center=true); rotate([0,90,0]) {{ cube([{x},1,1],center=true); }} }}".format(x=x)
  if type==3:
    return "union() {{ cube([{x},1,1],center=true); rotate([0,0,90]) {{ cube([{x},1,1],center=true); }} }}".format(x=x)

def getSphere(x=randrange(3)+1):
  return "sphere(r={x},$fn=40);".format(x=x)

def getDots(x=randrange(RANDRANGE)+0.5,type=randrange(RANDRANGE)):
  if type==0:
    return "union() {{ translate([-{x},-{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([{x},-{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([-{x},{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([{x},{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} }}".format(x=x)
  if type==1:
    return "rotate([0,0,45]) {{ union() {{ translate([-{x},-{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([{x},-{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([-{x},{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([{x},{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} }} }}".format(x=x)
  if type==2:
    return "rotate([90,0,0]) {{ union() {{ translate([-{x},-{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([{x},-{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([-{x},{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([{x},{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} }} }}".format(x=x)
  if type==3:
    return "rotate([90,45,0]) {{ union() {{ translate([-{x},-{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([{x},-{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([-{x},{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} translate([{x},{x},0]) {{ cube([0.5,0.5,0.5],center=true); }} }} }}".format(x=x)