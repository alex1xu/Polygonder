# python3 export3.py
# python3 export.py export3.scad

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
  getGem,
]

for i in range(50):
  shapes.append(list(random.sample(commands,3)))

shapes=list(map(combineShapes,shapes))

programScad(genName="export3",commands=[b for a,b in shapes],filenames=[a for a,b in shapes])