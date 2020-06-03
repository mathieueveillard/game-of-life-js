import * as hash from "object-hash";
import { identity } from "./utils";

interface InternalDataStructure {
  [column: number]: number[];
}

interface Position {
  column: number;
  line: number;
}

export class Board {
  constructor(private data: InternalDataStructure = {}) {}

  public add({ column, line }: Position): Board {
    if (this.has({ column, line })) {
      return this;
    }
    const newColumn: number[] = [...(this.data[column] || []), line].sort();
    return new Board({ ...this.data, [column]: newColumn });
  }

  public has({ column, line }: Position): boolean {
    const columnSlice = this.data[column];
    if (columnSlice === undefined) {
      return false;
    }
    return columnSlice.findIndex((l: number) => l === line) !== -1;
  }

  public map<T>(fn: (position: Position) => T): T[] {
    const result: T[] = [];
    const keys: string[] = Object.keys(this.data).sort();
    keys.forEach((c: string) => {
      const column: number = parseInt(c);
      this.data[column].forEach((line: number) => {
        result.push(fn({ column, line }));
      });
    });
    return result;
  }

  public filter(predicate: (position: Position) => boolean): Board {
    let result: Board = new Board({});
    const keys: string[] = Object.keys(this.data).sort();
    keys.forEach((c: string) => {
      const column: number = parseInt(c);
      this.data[column].forEach((line: number) => {
        if (predicate({ column, line })) {
          result = result.add({ column, line });
        }
      });
    });
    return result;
  }

  public merge(otherBoard: Board): Board {
    return otherBoard.map(identity).reduce((board: Board, position: Position) => board.add(position), this);
  }

  public equals(otherBoard: Board): boolean {
    return hash(this) === hash(otherBoard);
  }

  public toString(): string {
    return this.map<string>(({ column, line }: Position) => `(${column}, ${line})`).join(", ");
  }
}
