import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "urql";
import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";
import { graphql } from "../graphql";

const createGameMutationDocument = graphql(`
    mutation createNewGame{
      createNewGame {
        id
      }
    }
`)

export default function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [, createGame] = useMutation(createGameMutationDocument);

  const handleStart = async () => {
    const res = await createGame({});
    if (res.data?.createNewGame?.id) {
      navigate(`/sudoku/${res.data.createNewGame.id}`);
    }
  };

  return (
    <Box textAlign="center" mt={20}>
      <VStack spaceX={4} spaceY={4}>
        <Heading>Sudoku Game</Heading>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          width="300px"
        />
        <Button colorScheme="orange" onClick={handleStart} disabled={!name}>
          Start Game
        </Button>
      </VStack>
    </Box>
  );
}
