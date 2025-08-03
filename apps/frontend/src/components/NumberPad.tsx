import { HStack, Button } from "@chakra-ui/react";
import { ValueInputMode } from "../types/game";

interface NumberPadProps {
  onClick: (value: number) => void;
  mode?: ValueInputMode;
}

export const NumberPad = ({ onClick, mode = 'value' }: NumberPadProps) => (
  <HStack gap={{ base: 1, md: 2 }} justify="center" wrap="wrap" maxW="100%">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
      <Button 
        key={n} 
        onClick={() => onClick(n)}
        bg={mode === 'value' ? "blue.500" : "green.500"}
        size={{ base: "sm", md: "md" }}
        minW={{ base: "32px", md: "40px" }}
        h={{ base: "32px", md: "40px" }}
        fontSize={{ base: "sm", md: "md" }}
        fontWeight="bold"
        _hover={{ transform: "scale(1.05)" }}
        _active={{ transform: "scale(0.95)" }}
      >
        {n}
      </Button>
    ))}
    <Button 
      bg="red.500" 
      onClick={() => onClick(0)}
      size={{ base: "sm", md: "md" }}
      minW={{ base: "50px", md: "60px" }}
      h={{ base: "32px", md: "40px" }}
      fontSize={{ base: "xs", md: "sm" }}
      fontWeight="bold"
      _hover={{ transform: "scale(1.05)" }}
      _active={{ transform: "scale(0.95)" }}
    >
      Clear
    </Button>
  </HStack>
);
