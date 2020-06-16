import { Position } from "./index";

export function comparePositions({ x: x1, y: y1 }: Position, { x: x2, y: y2 }: Position): 1 | -1 {
  return x1 < x2 || (x1 === x2 && y1 <= y2) ? -1 : 1;
}
