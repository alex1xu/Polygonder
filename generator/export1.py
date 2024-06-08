# python3 export1.py
# python3 export.py export1.scad

from scadUtility import *
import random

shapes=[]
commands=[
  getRect,
  getSphere,
  getCylinder,
  getPyramid,
  getKilo,
  getCheese,
  getCross,
  getDots,
]

for i in range(200):
  shapes.append(list(random.sample(commands,3)))

shapes=list(map(combineShapes,shapes))

programScad(genName="export1",commands=[b for a,b in shapes],filenames=[a for a,b in shapes])