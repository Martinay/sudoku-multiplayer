import { Heading } from "@chakra-ui/react";

interface GameHeaderProps {
  difficulty: number | string;
}

export const GameHeader = ({ difficulty }: GameHeaderProps) => (
  <Heading size={{ base: "md", md: "lg" }} color="blue.600" textAlign="center">
    Sudoku - Difficulty {difficulty}
  </Heading>
);