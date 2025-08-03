import { Grid } from "@chakra-ui/react";
import { SudokuCell } from "./SudokuCell";
import { SettingsData } from "../utils/settings";
import { SudokuCellData, CellPosition } from "../types/game";

interface SudokuGridProps {
  board: SudokuCellData[];
  selected: CellPosition | null;
  onSelect: (row: number, column: number) => void;
  settings: SettingsData;
}

export const SudokuGrid = ({ board, selected, onSelect, settings }: SudokuGridProps) => {
  const getCell = (row: number, col: number) =>
    board.find(cell => cell?.row === row && cell?.column === col) || null;

  return (
    <Grid
      templateColumns={{ base: "repeat(9, 32px)", sm: "repeat(9, 36px)", md: "repeat(9, 40px)" }}
      templateRows={{ base: "repeat(9, 32px)", sm: "repeat(9, 36px)", md: "repeat(9, 40px)" }}
      gap={0}
      justifyContent="center"
      bg="white"
      p={{ base: 2, md: 3 }}
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
              settings={settings}
            />
          );
        })
      )}
    </Grid>
  );
};
