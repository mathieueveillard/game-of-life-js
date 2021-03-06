import { cartesianProduct, flatten } from "./util";

export interface Position {
  x: number;
  y: number;
}

type AliveCell = Position;

interface Delta {
  dX: number;
  dY: number;
}

/*
 * This data structure is optimized for sparse matrices. The downside is that reading
 * a cell's content consists in looking for the cell's position in a list, resulting
 * in an overall implementation of `nextGeneration` in O(n^2).
 */
export type Board = AliveCell[];

export type Neighborhood = AliveCell[];

export type Candidates = AliveCell[];

export function shouldLive(isAlive: boolean, numberOfNeighbors: number): boolean {
  return (isAlive && (numberOfNeighbors === 2 || numberOfNeighbors === 3)) || (!isAlive && numberOfNeighbors === 3);
}

/* O(n) */
export function numberOfNeighbors(board: Board, position: Position): number {
  return board.filter(
    ({ x, y }) =>
      !(x === position.x && y === position.y) && Math.abs(x - position.x) <= 1 && Math.abs(y - position.y) <= 1
  ).length;
}

const deltas: Delta[] = cartesianProduct([-1, 0, 1], [-1, 0, 1], (dX, dY) => ({ dX, dY }));

export function computeNeighborhood({ x, y }: Position): Neighborhood {
  return deltas.map(({ dX, dY }) => ({
    x: x + dX,
    y: y + dY
  }));
}

function toKey({ x, y }: Position): string {
  return `${x}${y}`;
}

/* O(n), assuming that creating a Map is at most of O(n) complexity */
export function computeCandidates(board: Board): Candidates {
  const candidatesWithDuplicates: Array<[string, Position]> = board
    .map(computeNeighborhood)
    .reduce(flatten, [])
    .map(position => [toKey(position), position]);
  return [...new Map(candidatesWithDuplicates)].map(([_, position]) => position);
}

/* O(n) */
export function isAlive(board: Board, position: Position): boolean {
  return board.find(({ x, y }) => x === position.x && y === position.y) !== undefined;
}

/* O(n^2) */
export function nextGeneration(board: Board): Board {
  return computeCandidates(board).filter(position =>
    shouldLive(isAlive(board, position), numberOfNeighbors(board, position))
  );
}
