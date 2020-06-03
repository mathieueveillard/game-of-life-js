import { Board } from "./Board";

describe("new Board()", () => {
  it("Should allow to create an empty Board", () => {
    expect(() => new Board()).not.toThrow();
  });
});

describe("Board.has()", () => {
  it("Should return false if the position is not referenced (no column at all)", () => {
    const board = new Board({});
    const actual: boolean = board.has({ column: 0, line: 0 });
    const expected: boolean = false;
    expect(actual).toEqual(expected);
  });

  it("Should return false if the position is not referenced", () => {
    const board = new Board({ 0: [1] });
    const actual: boolean = board.has({ column: 0, line: 0 });
    const expected: boolean = false;
    expect(actual).toEqual(expected);
  });

  it("Should return true if the position is referenced", () => {
    const board = new Board({ 0: [0] });
    const actual: boolean = board.has({ column: 0, line: 0 });
    const expected: boolean = true;
    expect(actual).toEqual(expected);
  });
});

describe("Board.equals()", () => {
  it("Should return true if boards are the same", () => {
    const board = new Board({ 0: [0], 1: [0, 1] });
    const anotherBoard = new Board({ 0: [0], 1: [0, 1] });
    expect(board.equals(anotherBoard)).toEqual(true);
  });

  it("Should return false if boards are not the same", () => {
    const board = new Board({ 0: [0], 1: [0, 1] });
    const anotherBoard = new Board({ 0: [0] });
    expect(board.equals(anotherBoard)).toEqual(false);
  });
});

describe("Board.add()", () => {
  it("Should allow to add a position to an existing Board (case empty column)", () => {
    const board = new Board({ 0: [0], 1: [0, 2] });
    const actual: Board = board.add({ column: 2, line: 0 });
    const expected = new Board({ 0: [0], 1: [0, 2], 2: [0] });
    expect(actual.equals(expected)).toEqual(true);
  });

  it("Should allow to add a position to an existing Board (case non-empty column)", () => {
    const board = new Board({ 0: [0], 1: [0, 2] });
    const actual: Board = board.add({ column: 1, line: 1 });
    const expected = new Board({ 0: [0], 1: [0, 1, 2] });
    expect(actual.equals(expected)).toEqual(true);
  });

  it("Should return the existing board if the board already has this position", () => {
    const board = new Board({ 0: [0], 1: [0, 2] });
    const actual: Board = board.add({ column: 0, line: 0 });
    const expected = board;
    expect(actual.equals(expected)).toEqual(true);
  });
});

describe("Board.map()", () => {
  it("Should return an array of mapped positions", () => {
    const board = new Board({ 0: [0], 1: [0, 1] });
    const actual: number[] = board.map<number>(({ column, line }) => column + line);
    const expected: number[] = [0, 1, 2];
    expect(actual).toEqual(expected);
  });
});

describe("Board.filter()", () => {
  it("Should return a new Board based on predicate function", () => {
    const board = new Board({ 0: [0], 1: [0, 1] });
    const actual: Board = board.filter(({ column, line }) => column + (line % 2) === 0);
    const expected = new Board({ 0: [0], 1: [1] });
    expect(actual.equals(expected)).toEqual(false);
  });
});

describe("Board.merge()", () => {
  it("Should return a new Board that merges both boards (no overlap)", () => {
    const firstBoard = new Board({ 0: [0], 1: [0, 1] });
    const secondBoard = new Board({ 2: [3] });
    const actual = firstBoard.merge(secondBoard);
    const expected = new Board({ 0: [0], 1: [0, 1], 2: [3] });
    expect(actual.equals(expected)).toEqual(true);
  });
});

describe("Board.toString()", () => {
  it("Should return a string representing a Board", () => {
    const board = new Board({ 0: [0], 1: [0, 1] });
    const actual: string = board.toString();
    const expected = "(0, 0), (1, 0), (1, 1)";
    expect(actual).toEqual(expected);
  });
});
