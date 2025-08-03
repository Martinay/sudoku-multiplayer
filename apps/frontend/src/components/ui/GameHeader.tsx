import { Heading } from "@chakra-ui/react";

interface GameHeaderProps {
  difficulty: number | string;
}

export const GameHeader = ({ difficulty }: GameHeaderProps) => (
  <Heading size="lg" color="blue.600">
    Sudoku - Difficulty {difficulty}
  </Heading>
);