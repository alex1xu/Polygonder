# PRIMITIVE SHAPES
from random import randrange
RANDRANGE=4

def programScad(genName,commands,filenames):
  f = open("{filename}.scad".format(filename=genName), "w+")
  f.write("module export() {\n")

  for idx,args in enumerate(zip(commands,filenames)):
    f.write("\t")
    f.write(args[0])
    f.write(" //{idx}-{filename}\n".format(idx=idx,filename=args[1]))

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
    if command is getGem: filename+="Gem"
  
  return (filename,"minkowski() {{ {shapes} }}".format(shapes=" ".join(shapes)))

def getCheese(x=randrange(RANDRANGE)+1.5):
  return "rotate([{r1},{r2},{r3}]) cylinder({x},{x},{x},$fn=3,center=true);".format(x=x,r1=randrange(4)*45,r2=randrange(4)*45,r3=randrange(4)*45)

def getPyramid(x=randrange(RANDRANGE)+2):
  return "rotate([{r1},{r2},{r3}]) cylinder({x},{x},0,$fn=4,center=true);".format(x=x,r1=randrange(4)*45,r2=randrange(4)*45,r3=randrange(4)*45)

def getKilo(x=randrange(RANDRANGE)+2):
  return "rotate([{r1},{r2},{r3}]) cylinder({x},{x},1,$fn=4,center=true);".format(x=x,r1=randrange(4)*45,r2=randrange(4)*45,r3=randrange(4)*45)

def getCylinder(x=randrange(RANDRANGE)+2):
  return "rotate([{r1},{r2},{r3}]) cylinder(h={x},r1=1,r2=1,$fn=40,center=true);".format(x=x,r1=randrange(4)*45,r2=randrange(4)*45,r3=randrange(4)*45)
  
def getRect(x=randrange(RANDRANGE)+2):
  return "rotate([{r1},{r2},{r3}]) cube([1,1,{x}],center=true);".format(x=x,r1=randrange(4)*45,r2=randrange(4)*45,r3=randrange(4)*45)

def getCross(x=randrange(RANDRANGE)+2):
  return "rotate([{r1},{r2},{r3}]) union() {{ cube([{x},1,1],center=true); rotate([0,90,0]) {{ cube([{x},1,1],center=true); }}; }}".format(x=x,r1=randrange(4)*45,r2=randrange(4)*45,r3=randrange(4)*45)

def getSphere(x=randrange(RANDRANGE)+1):
  return "sphere(r={x},$fn=40);".format(x=x)

def getGem(x=randrange(RANDRANGE)+1):
  return "rotate([{r1},{r2},{r3}]) union() {{ cylinder(h={x}, r1={x}, r2=0, $fn=4); rotate([0,0,45]) cylinder(h={x}, r1={x}, r2=0, $fn=4); mirror([0,0,1]) {{ cylinder(h={x}, r1={x}, r2=0, $fn=4); rotate([0,0,45]) cylinder(h={x}, r1={x}, r2=0, $fn=4); }} }};".format(x=x,r1=randrange(4)*45,r2=randrange(4)*45,r3=randrange(4)*45)