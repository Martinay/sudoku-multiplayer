import type { SudokuCellResolvers } from './../../types.generated';
export const SudokuCell: SudokuCellResolvers = {
  annotations: (parent) => parent.annotations || { matrix: [] },
};
