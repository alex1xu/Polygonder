# python3 export2.py
# python3 export.py export2.scad

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

for i in range(8):
  shapes.append([commands[i]])

shapes=list(map(combineShapes,shapes))

programScad(genName="export2",commands=[b for a,b in shapes],filenames=[a for a,b in shapes])