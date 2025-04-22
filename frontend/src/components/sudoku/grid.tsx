import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import Cell from './cell';

interface SudokuGridProps {
  board: Array<{row: number, column: number, value?: number | null, isValid?: boolean | null, isEditable: boolean } | null>;
  onCellUpdate: (row: number, column: number, value: number | null) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ board, onCellUpdate }) => {
  return (
    <Box p={4}>
      <SimpleGrid columns={9} spaceX={1} spaceY={1}>
        {board.map((cell) => {
          if (!cell) return null;
          return (
            <Cell
              key={`${cell.row}-${cell.column}`}
              row={cell.row}
              column={cell.column}
              value={cell.value}
              isEditable={cell.isEditable}
              isValid={cell.isValid}
              onUpdate={onCellUpdate}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default SudokuGrid;