export interface SudokuCellData {
  row: number;
  column: number;
  value?: number | null;
  isValid?: boolean | null;
  isEditable: boolean;
  annotations?: {
    matrix: number[];
  } | null;
}

export interface GameData {
  id: string;
  difficulty: number;
  board: SudokuCellData[];
}

export interface CellPosition {
  row: number;
  column: number;
}

export type ValueInputMode = 'value' | 'annotation';