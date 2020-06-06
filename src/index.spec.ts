import {
  shouldLive,
  Board,
  numberOfNeighbors,
  Candidates,
  computeCandidates,
  computeNeighborhood,
  Neighborhood,
  nextGeneration,
  isAlive,
  comparePositions
} from ".";

it("Any live cell with fewer than two live neighbors dies", function() {
  expect(shouldLive(true, 1)).toEqual(false);
});

it("Any live cell with two live neighbors lives on to the next generation", function() {
  expect(shouldLive(true, 2)).toEqual(true);
});

it("Any live cell with three live neighbors lives on to the next generation", function() {
  expect(shouldLive(true, 3)).toEqual(true);
});

it("Any live cell with more than three live neighbors dies", function() {
  expect(shouldLive(true, 4)).toEqual(false);
});

it("Any dead cell stays dead per default", function() {
  expect(shouldLive(false, 2)).toEqual(false);
});

it("Any dead cell with exactly three live neighbors becomes a live cell", function() {
  expect(shouldLive(false, 3)).toEqual(true);
});

it("Any dead cell with more than three live neighbors becomes a live cell", function() {
  expect(shouldLive(false, 4)).toEqual(false);
});

it("Should compute the number of neighbors of a given cell", function() {
  const board: Board = [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: -1 }
  ];
  expect(numberOfNeighbors(board, { x: 0, y: 0 })).toEqual(3);
});

it("Should compute the neighborhood of a given cell", function() {
  const actualNeighborhood = computeNeighborhood({ x: 0, y: 0 });
  const expectedNeighborhood: Neighborhood = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 }
  ];
  expect(actualNeighborhood).toEqual(expectedNeighborhood);
});

it("Should compute all positions that are candidate for the next generation", function() {
  const board: Board = [
    { x: -1, y: 0 },
    { x: 0, y: 1 }
  ];
  const actualCandidates = computeCandidates(board);
  const expectedCandidates: Candidates = [
    { x: -2, y: -1 },
    { x: -2, y: 0 },
    { x: -2, y: 1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 2 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 }
  ];
  expect(actualCandidates).toEqual(expectedCandidates);
});

it("Should say whether a cell is alive or not", function() {
  const board: Board = [{ x: 0, y: 0 }];
  expect(isAlive(board, { x: 0, y: 0 })).toEqual(true);
  expect(isAlive(board, { x: 0, y: 1 })).toEqual(false);
});

it("Should compare positions", function() {
  expect(comparePositions({ x: 1, y: 0 }, { x: 0, y: 0 })).toEqual(1);
  expect(comparePositions({ x: 0, y: 1 }, { x: 0, y: 0 })).toEqual(1);
  expect(comparePositions({ x: 0, y: 1 }, { x: 1, y: 0 })).toEqual(-1);
});

it("Should compute the next generation board", function() {
  const board: Board = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 2 }
  ];
  const actualNextGeneration = nextGeneration(board);
  const expectedNextGeneration: Board = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 2 }
  ];
  expect(actualNextGeneration).toEqual(expectedNextGeneration);
});
