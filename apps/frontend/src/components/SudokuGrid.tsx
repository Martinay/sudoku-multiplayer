import { Grid } from "@chakra-ui/react";
import { SudokuCell } from "./SudokuCell";

type Props = {
  board: ({row: number; column: number; value?: number | null | undefined; isValid?: boolean | null | undefined; isEditable: boolean; annotations?: { matrix: number[]; } | null; } | null)[];
  selected: { row: number; column: number } | null;
  onSelect: (row: number, column: number) => void;
};

export const SudokuGrid = ({ board, selected, onSelect }: Props) => {
  const getCell = (row: number, col: number) =>
    board.find(cell => cell?.row === row && cell?.column === col) || null;

  return (
    <Grid
      templateColumns="repeat(9, 40px)"
      templateRows="repeat(9, 40px)"
      gap={0}
      justifyContent="center"
      bg="white"
      p={3}
      borderRadius="md"
      border="2px solid #2D3748"
      boxShadow="md"
      mx="auto"
    >
      {Array.from({ length: 9 }).flatMap((_, row) =>
        Array.from({ length: 9 }).map((_, col) => {
          const cell = getCell(row, col);
          const isSelected = selected?.row === row && selected?.column === col;
          const borderTop = row % 3 === 0 ? "2px solid black" : "1px solid grey";
          const borderBottom = row === 8 ? "2px solid black" : "1px solid grey"; // Thicker bottom for last row
          const borderLeft = col % 3 === 0 ? "2px solid black" : "1px solid grey";
          const borderRight = col === 8 ? "2px solid black" : "1px solid grey"; // Thicker right for last col

          return (
            <SudokuCell
              key={`${row}-${col}`}
              cell={cell}
              isSelected={isSelected}
              onClick={() => onSelect(row, col)}
              borderTop={borderTop}
              borderBottom={borderBottom}
              borderLeft={borderLeft}
              borderRight={borderRight}
            />
          );
        })
      )}
    </Grid>
  );
};
