import { GridItem, Grid, Box } from "@chakra-ui/react";
import { SettingsData } from "../utils/settings";
import { SudokuCellData } from "../types/game";

interface SudokuCellProps {
  cell: SudokuCellData | null;
  isSelected: boolean;
  onClick: () => void;
  borderTop: string;
  borderBottom: string;
  borderLeft: string;
  borderRight: string;
  settings: SettingsData;
}

export const SudokuCell = ({
  cell,
  isSelected,
  onClick,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  settings,
}: SudokuCellProps) => {
  const renderCellContent = () => {
    if (cell?.value) {
      return cell.value;
    }

    if (settings.showMatrixAnnotations && cell?.annotations?.matrix && cell.annotations.matrix.length > 0) {
      return (
        <Grid
          templateColumns="repeat(3, 1fr)"
          templateRows="repeat(3, 1fr)"
          gap={0}
          w="100%"
          h="100%"
          fontSize={{ base: "8px", md: "10px" }}
          fontWeight="normal"
        >
          {Array.from({ length: 9 }).map((_, index) => {
            const number = index + 1;
            const hasAnnotation = cell.annotations?.matrix.includes(number);
            return (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color={hasAnnotation ? "blue.600" : "transparent"}
                fontSize={{ base: "7px", md: "9px" }}
              >
                {hasAnnotation ? number : ""}
              </Box>
            );
          })}
        </Grid>
      );
    }

    return "";
  };

  return (
    <GridItem
      bg={isSelected ? "blue.100" : cell?.isEditable ? "white" : "gray.100"}
      borderTop={borderTop}
      borderBottom={borderBottom}
      borderLeft={borderLeft}
      borderRight={borderRight}
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor={cell?.isEditable ? "pointer" : "default"}
      onClick={() => cell?.isEditable && onClick()}
      fontWeight={cell?.isEditable ? "normal" : "bold"}
      color={
        cell?.isEditable === false
          ? "gray.700"
          : settings.checkForMistakes && cell?.isValid === false
          ? "red.500"
          : "blue.500"
      }
      fontSize={{ base: "sm", md: "lg" }}
      transition="all 0.2s"
      _hover={
        cell?.isEditable ? { bg: "blue.50", transform: "scale(1.05)" } : {}
      }
      _active={cell?.isEditable ? { transform: "scale(0.95)" } : {}}
    >
      {renderCellContent()}
    </GridItem>
  );
};