import { Board } from "./Board";
import { Direction, DIRECTIONS } from "./Direction";
import { LifeStatus, computeLifeStatusOnNextGeneration } from "./ComputeLifeStatus";
import { identity } from "./utils";
const flatten = require("lodash.flatten");

interface Position {
  column: number;
  line: number;
}

function isAlive(board: Board) {
  return function(position): boolean {
    return board.has(position);
  };
}

function isDead(board: Board) {
  return function(position: Position): boolean {
    return !board.has(position);
  };
}

function computeNeighborsPositions({ column, line }: Position): Position[] {
  function computeNeighborPositionInDirection({ dColumn, dLine }: Direction): Position {
    return {
      column: column + dColumn,
      line: line + dLine
    };
  }
  return DIRECTIONS.map(computeNeighborPositionInDirection);
}

export function computeNumberOfNeighbors(board: Board, position: Position): number {
  return computeNeighborsPositions(position).filter(isAlive(board)).length;
}

export function computeNextGenerationForLifeStatus(board: Board, positions: Board, lifeStatus: LifeStatus): Board {
  return positions.filter((position: Position) => {
    const numberOfNeighbors: number = computeNumberOfNeighbors(board, position);
    return computeLifeStatusOnNextGeneration(lifeStatus, numberOfNeighbors) === "ALIVE";
  });
}

export function computeNextGenerationForLivingCells(board: Board): Board {
  return computeNextGenerationForLifeStatus(board, board, "ALIVE");
}

export function computeDeadNeighbors(board: Board): Board {
  const alivePositions: Position[] = board.map(identity);
  const neighborsOfAlivePositions: Position[] = flatten(alivePositions.map(computeNeighborsPositions));
  const deadNeighborsOfAlivePositions: Position[] = neighborsOfAlivePositions.filter(isDead(board));
  return deadNeighborsOfAlivePositions.reduce((board: Board, position: Position) => board.add(position), new Board());
}

export function computeNextGenerationForDeadCells(board: Board): Board {
  const deadNeighbors: Board = computeDeadNeighbors(board);
  return computeNextGenerationForLifeStatus(board, deadNeighbors, "DEAD");
}

export function computeNextGeneration(board: Board): Board {
  const nextGenerationForLivingCells: Board = computeNextGenerationForLivingCells(board);
  const nextGenerationForDeadCells: Board = computeNextGenerationForDeadCells(board);
  return nextGenerationForLivingCells.merge(nextGenerationForDeadCells);
}
