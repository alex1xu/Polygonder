# Polygonder

> Guess the composition of a daily mega shape!

[Play Here](https://polydle.vercel.app/)

[Untitled_ Jun 19, 2024 4_46 PM.webm](https://github.com/alex1xu/Polygonder/assets/65417426/0125be00-0fde-4bc7-939a-02f5ea1c200c)

### How to Play

Based on the [Minkowski Sum](https://en.wikipedia.org/wiki/Minkowski_addition), a "mega shape" is made by "sweeping" one "basic shape" around another, resulting in a new shape formed by all possible positions of the first shape relative to the second. In Polygonder, there is a new mega shape each day, formed by the Minkowski Sum of three basic shapes.

### Development

Mega shapes are generated in batches by generating OpenSCAD scripts. Shapes are rendered using Three.js in a vanilla HTML/CSS/JavaScript application. 
