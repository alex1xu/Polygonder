# python3 export0.py
# python3 export.py export0.scad

from scadUtility import *

shapes=[
  [getRect],
  [getSphere],
  [getCylinder],
  [getPyramid],
  [getKilo],
  [getCheese],
  [getCross],
  [getDots],
]

shapes=list(map(combineShapes,shapes))

programScad(genName="export0",commands=[b for a,b in shapes],filenames=[a for a,b in shapes])