import { HStack, Button } from "@chakra-ui/react";

type Props = {
  onClick: (value: number) => void;
};

export const NumberPad = ({ onClick }: Props) => (
  <HStack gap={2} justify="center" wrap="wrap">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
      <Button 
        key={n} 
        onClick={() => onClick(n)}
        bg="blue.500"
        size="md"
        minW="40px"
        h="40px"
        fontSize="md"
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
      size="md"
      minW="60px"
      h="40px"
      fontSize="sm"
      fontWeight="bold"
      _hover={{ transform: "scale(1.05)" }}
      _active={{ transform: "scale(0.95)" }}
    >
      Clear
    </Button>
  </HStack>
);
