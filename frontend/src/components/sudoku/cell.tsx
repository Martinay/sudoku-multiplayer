import React, { useState } from 'react';
import { Box, Input, Text } from '@chakra-ui/react';

interface CellProps {
  value?: number | null;
  isEditable: boolean;
  isValid?: boolean | null;
  row: number;
  column: number;
  onUpdate: (row: number, column: number, value: number | null) => void;
}

const Cell: React.FC<CellProps> = ({ value, isEditable, isValid, row, column, onUpdate }) => {
  const [cellValue, setCellValue] = useState<number | null>(value ?? null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? parseInt(e.target.value) : null;
    setCellValue(newValue);
    onUpdate(row, column, newValue);
  };

  return (
    <Box
      borderWidth={1}
      borderColor={isValid === false ? 'red.500' : 'gray.300'}
      padding={2}
      width="40px"
      height="40px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {isEditable ? (
        <Input
          value={cellValue ?? ''}
          onChange={handleChange}
          textAlign="center"
          size="sm"
          variant="outline"
        //   isInvalid={isValid === false}
        />
      ) : (
        <Text>{cellValue}</Text>
      )}
    </Box>
  );
};

export default Cell;