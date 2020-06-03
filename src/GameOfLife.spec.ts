import {
  computeNumberOfNeighbors,
  computeNextGenerationForLivingCells,
  computeDeadNeighbors,
  computeNextGenerationForDeadCells,
  computeNextGeneration
} from "./GameOfLife";
import { Board } from "./Board";

describe("Computation of neighbors", () => {
  describe("Right-sided neighbor", () => {
    it("Should return 0 if there is no neighbor in the next cell when heading right", () => {
      const board = new Board({});
      const actual: number = computeNumberOfNeighbors(board, { line: 0, column: 0 });
      const expected: number = 0;
      expect(actual).toEqual(expected);
    });

    it("Should return 1 if there is a neighbor in the next cell when heading right", () => {
      const board = new Board({
        1: [0]
      });
      const actual: number = computeNumberOfNeighbors(board, { column: 0, line: 0 });
      const expected: number = 1;
      expect(actual).toEqual(expected);
    });
  });

  describe("Neighbors of all directions", () => {
    it("Should compute the exact number of neighbors", () => {
      const board = new Board({
        0: [0, 1],
        1: [0, 2],
        2: [1]
      });
      const actual: number = computeNumberOfNeighbors(board, { column: 1, line: 1 });
      const expected: number = 5;
      expect(actual).toEqual(expected);
    });
  });
});

describe("Compute next generation for all living cells", () => {
  it("Should determine whether each living cell will still live on the next generation", () => {
    /*
     * A . .
     * A . A
     * . A .
     */
    const board = new Board({
      0: [0, 1],
      1: [2],
      2: [1]
    });
    const actual: Board = computeNextGenerationForLivingCells(board);
    /*
     * . . .
     * A . .
     * . A .
     */
    const expected = new Board({ 0: [1], 1: [2] });
    expect(actual.equals(expected)).toEqual(true);
  });
});

describe("Compute dead neighbors of living cells", () => {
  it("Compute dead neighbors of a single cell", () => {
    const board = new Board({ 0: [0] });
    const actual: Board = computeDeadNeighbors(board);
    const expected = new Board({ [-1]: [-1, 0, 1], 0: [-1, 1], 1: [-1, 0, 1] });
    expect(actual.equals(expected)).toEqual(true);
  });

  it("Compute dead neighbors of 2 cells with overlapping neighborhoods", () => {
    const board = new Board({ 0: [0], 2: [2] });
    const actual: Board = computeDeadNeighbors(board);
    const expected = new Board({ [-1]: [-1, 0, 1], 0: [-1, 1], 1: [-1, 0, 1, 2, 3], 2: [1, 3], 3: [1, 2, 3] });
    expect(actual.equals(expected)).toEqual(true);
  });

  it("Compute dead neighbors of a single cell with living cells in their neighborhood", () => {
    const board = new Board({ 0: [0], 1: [0] });
    const actual: Board = computeDeadNeighbors(board);
    const expected = new Board({ [-1]: [-1, 0, 1], 0: [-1, 1], 1: [-1, 1], 2: [-1, 0, 1] });
    expect(actual.equals(expected)).toEqual(true);
  });
});

describe("Compute next generation for all dead cells near living cells", () => {
  it("Should determine whether each dead cell will still live on the next generation", () => {
    /*
     * A . .
     * A . A
     * . A .
     */
    const board = new Board({
      0: [0, 1],
      1: [2],
      2: [1]
    });
    const actual: Board = computeNextGenerationForDeadCells(board);
    /*
     * . A .
     * . . .
     * . . .
     */
    const expected = new Board({ 1: [0] });
    expect(actual.equals(expected)).toEqual(true);
  });
});

describe("Compute next generation", () => {
  it("Should compute next generation", () => {
    /*
     * A . .
     * A . A
     * . A .
     */
    const board = new Board({
      0: [0, 1],
      1: [2],
      2: [1]
    });
    const actual: Board = computeNextGeneration(board);
    /*
     * . A .
     * A . .
     * . A .
     */
    const expected = new Board({ 0: [1], 1: [0, 2] });
    expect(actual.equals(expected)).toEqual(true);
  });
});
