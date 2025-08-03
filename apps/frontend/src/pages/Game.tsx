import { useParams } from "react-router";
import { Box, VStack, HStack } from "@chakra-ui/react";
import { SudokuGrid } from "../components/SudokuGrid";
import { NumberPad } from "../components/NumberPad";
import { Settings } from "../components/Settings";
import { LoadingSpinner, GameModeToggle, GameHeader, ErrorMessage } from "../components/ui";
import { useGameData, useGameActions, useGameState } from "../hooks";

export default function Game() {
  const { gameId } = useParams();
  if (!gameId) throw new Error("Game ID is required in the route");

  const { game, sudokuCells, loading, error } = useGameData(gameId);
  const { selected, setSelected, mode, setMode, settings, setSettings } = useGameState();
  const { handleNumberClick } = useGameActions(gameId, sudokuCells);

  const handleCellSelect = (row: number, column: number) => {
    setSelected({ row, column });
  };

  const handleNumberPadClick = (value: number) => {
    handleNumberClick(value, selected, mode);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!game || !sudokuCells) return <ErrorMessage message="Game not found" />;

  return (
    <HStack 
      gap={6} 
      alignItems="flex-start"
      justifyContent="center"
      p={4}
      maxH="100vh"
    >
      <Settings 
        settings={settings} 
        onSettingsChange={setSettings} 
      />
      
      <Box 
        textAlign="center" 
        p={3} 
        bg="rgba(255, 255, 255, 0.95)"
        borderRadius="xl"
        boxShadow="lg"
        maxW="600px"
      >
        <VStack gap={3}>
          <GameHeader difficulty={game.difficulty} />
          <GameModeToggle mode={mode} onModeChange={setMode} />
          <SudokuGrid 
            board={sudokuCells} 
            selected={selected} 
            onSelect={handleCellSelect}
            settings={settings}
          />
          <NumberPad onClick={handleNumberPadClick} mode={mode} />
        </VStack>
      </Box>
    </HStack>
  );
}
