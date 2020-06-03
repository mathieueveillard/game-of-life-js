# game-of-life-js

## Rules

Implement a function that, given a two-dimensional grid of cells, each one being alive or dead, computes the next generation of cells according to the following rules:

- Rule #1 (underpopulation): Any live cell with fewer than two live neighbors dies.
- Rule #2 (continuation): Any live cell with two or three live neighbors lives on to the next generation.
- Rule #3 (overpopulation): Any live cell with more than three live neighbors dies.
- Rule #4 (reproduction): Any dead cell with exactly three live neighbors becomes a live cell.

The algorithm you're about to design should be able to handle efficiently potentially very large boards but with sparse population.

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

![Rule #1](/assets/Rule1.png)
![Rule #2](/assets/Rule2.png)
![Rule #3](/assets/Rule3.png)
![Rule #4](/assets/Rule4.png)
![Example](/assets/Example.png)

## Installation

```
git clone https://github.com/mathieueveillard/game-of-life-js.git
cd game-of-life-js
npm install
```

## Development

```
npm test
```
