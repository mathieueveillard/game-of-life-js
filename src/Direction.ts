export interface Direction {
  dColumn: number;
  dLine: number;
}

export const DIRECTIONS: Direction[] = [
  {
    dColumn: 0,
    dLine: -1
  },
  {
    dColumn: 1,
    dLine: -1
  },
  {
    dColumn: 1,
    dLine: 0
  },
  {
    dColumn: 1,
    dLine: 1
  },
  {
    dColumn: 0,
    dLine: 1
  },
  {
    dColumn: -1,
    dLine: 1
  },
  {
    dColumn: -1,
    dLine: 0
  },
  {
    dColumn: -1,
    dLine: -1
  }
];
