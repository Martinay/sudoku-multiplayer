import { useMutation } from "urql";
import { CellPosition, ValueInputMode, SudokuCellData } from "../types/game";
import { graphql } from "../graphql/gql";

const updateCellValueMutationDocument = graphql(`
    mutation updateCellValue($gameId : ID!, $row: Int!, $column: Int!, $newValue: Int){
        updateCellValue(gameId: $gameId, row:$row, column: $column, value: $newValue)
    }
`);

const updateCellAnnotationsMutationDocument = graphql(`
    mutation updateCellAnnotations($gameId : ID!, $row: Int!, $column: Int!, $annotations: SudokuCellAnnotationsInput!){
        updateCellAnnotations(gameId: $gameId, row:$row, column: $column, annotations: $annotations)
    }
`);

export const useGameActions = (gameId: string, sudokuCells: SudokuCellData[] | null) => {
  const [, updateCellValue] = useMutation(updateCellValueMutationDocument);
  const [, updateCellAnnotations] = useMutation(updateCellAnnotationsMutationDocument);

  const handleNumberClick = (value: number, selected: CellPosition | null, mode: ValueInputMode) => {
    if (!selected) return;

    if (value === 0) {
      // Clear button: remove both value and annotations
      updateCellValue({
        gameId,
        row: selected.row,
        column: selected.column,
        newValue: null,
      });
      updateCellAnnotations({
        gameId,
        row: selected.row,
        column: selected.column,
        annotations: { matrix: [] },
      });
    } else if (mode === 'value') {
      updateCellValue({
        gameId,
        row: selected.row,
        column: selected.column,
        newValue: value,
      });
    } else {
      const cell = sudokuCells?.find(c => c.row === selected.row && c.column === selected.column);
      
      if (cell) {
        const currentAnnotations = cell.annotations?.matrix || [];
        const newAnnotations = currentAnnotations.includes(value)
          ? currentAnnotations.filter(a => a !== value)
          : [...currentAnnotations, value].sort();
        
        updateCellAnnotations({
          gameId,
          row: selected.row,
          column: selected.column,
          annotations: { matrix: newAnnotations },
        });
      }
    }
  };

  return {
    handleNumberClick,
  };
};