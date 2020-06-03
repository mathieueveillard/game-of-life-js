import { LifeStatus, computeLifeStatusOnNextGeneration } from "./ComputeLifeStatus";

describe("Next generation rules", () => {
  describe("Rule 1: Any live cell with fewer than two live neighbors dies, as if by underpopulation", () => {
    it("A live cell with one neighbor should die", () => {
      const actual: LifeStatus = computeLifeStatusOnNextGeneration("ALIVE", 1);
      const expected: LifeStatus = "DEAD";
      expect(actual).toEqual(expected);
    });
  });

  describe("Rule 2: Any live cell with two or three live neighbors lives on to the next generation", () => {
    it("A live cell with two neighbors should live", () => {
      const actual: LifeStatus = computeLifeStatusOnNextGeneration("ALIVE", 2);
      const expected: LifeStatus = "ALIVE";
      expect(actual).toEqual(expected);
    });

    it("A live cell with three neighbors should live", () => {
      const actual: LifeStatus = computeLifeStatusOnNextGeneration("ALIVE", 3);
      const expected: LifeStatus = "ALIVE";
      expect(actual).toEqual(expected);
    });
  });

  describe("Rule 3: Any live cell with more than three live neighbors dies, as if by overpopulation", () => {
    it("A live cell with four neighbors should die", () => {
      const actual: LifeStatus = computeLifeStatusOnNextGeneration("ALIVE", 4);
      const expected: LifeStatus = "DEAD";
      expect(actual).toEqual(expected);
    });
  });

  describe("Rule 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction", () => {
    it("A dead cell with any number of neighbors should stay dead", () => {
      const actual: LifeStatus = computeLifeStatusOnNextGeneration("DEAD", 2);
      const expected: LifeStatus = "DEAD";
      expect(actual).toEqual(expected);
    });

    it("A dead cell with 3 neighbors should live", () => {
      const actual: LifeStatus = computeLifeStatusOnNextGeneration("DEAD", 3);
      const expected: LifeStatus = "ALIVE";
      expect(actual).toEqual(expected);
    });
  });
});
