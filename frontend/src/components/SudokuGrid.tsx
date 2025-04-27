import { Grid, GridItem } from "@chakra-ui/react";

type Props = {
  board: ({row: number; column: number; value?: number | null | undefined; isValid?: boolean | null | undefined; isEditable: boolean; } | null)[];
  selected: { row: number; column: number } | null;
  onSelect: (row: number, column: number) => void;
};

export const SudokuGrid = ({ board, selected, onSelect }: Props) => {
  const getCell = (row: number, col: number) =>
    board.find(cell => cell?.row === row && cell?.column === col);

  return (
    <Grid
      templateColumns="repeat(9, 40px)"
      templateRows="repeat(9, 40px)"
      gap={0}
      justifyContent="center"
      bg="gray.100"
      p={4}
      borderRadius="md"
      border="2px solid black" // Add a thicker outer border
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
            <GridItem
              key={`${row}-${col}`}
              bg={isSelected ? "orange.200" : cell?.isEditable ? "white" : "gray.300"}
              borderTop={borderTop}
              borderBottom={borderBottom}
              borderLeft={borderLeft}
              borderRight={borderRight}
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor={cell?.isEditable ? "pointer" : "default"}
              onClick={() => cell?.isEditable && onSelect(row, col)}
              fontWeight={cell?.isEditable ? "normal" : "bold"}
              color={cell?.isValid === false ? "red.500" : "black"}
              fontSize="xl" // Optional: Increase font size for better visibility
            >
              {cell?.value ?? ""}
            </GridItem>
          );
        })
      )}
    </Grid>
  );
};
