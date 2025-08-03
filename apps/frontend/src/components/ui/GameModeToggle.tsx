import { HStack, Button } from "@chakra-ui/react";
import { ValueInputMode } from "../../types/game";

interface GameModeToggleProps {
  mode: ValueInputMode;
  onModeChange: (mode: ValueInputMode) => void;
}

export const GameModeToggle = ({ mode, onModeChange }: GameModeToggleProps) => (
  <HStack gap={3}>
    <Button 
      bg={mode === 'value' ? 'blue.500' : 'transparent'}
      color={mode === 'value' ? 'white' : 'blue.500'}
      border="2px solid"
      borderColor="blue.500"
      onClick={() => onModeChange('value')}
      _hover={{ bg: mode === 'value' ? 'blue.600' : 'blue.50' }}
    >
      Value Mode
    </Button>
    <Button 
      bg={mode === 'annotation' ? 'green.500' : 'transparent'}
      color={mode === 'annotation' ? 'white' : 'green.500'}
      border="2px solid"
      borderColor="green.500"
      onClick={() => onModeChange('annotation')}
      _hover={{ bg: mode === 'annotation' ? 'green.600' : 'green.50' }}
    >
      Annotation Mode
    </Button>
  </HStack>
);