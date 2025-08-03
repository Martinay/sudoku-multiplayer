import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "urql";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
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
    <Box textAlign="center" mt={20} p={8}>
      <VStack spaceX={8} spaceY={8}>
        <Box>
          <Heading size="2xl" color="white" mb={2}>
            🧩 Sudoku Game
          </Heading>
          <Text fontSize="lg" color="gray.100">
            Challenge yourself with multiplayer Sudoku!
          </Text>
        </Box>
        
        <Box 
          bg="white" 
          p={8} 
          borderRadius="xl" 
          boxShadow="lg" 
          border="1px solid" 
          borderColor="gray.200"
          minW="400px"
        >
          <VStack spaceX={6} spaceY={6}>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              size="lg"
              variant="flushed"
              bg="gray.50"
              _hover={{ bg: "gray.100" }}
              _focus={{ bg: "white", borderColor: "blue.500" }}
              borderRadius="lg"
            />
            <Button 
              bg="blue.500"
              color="white"
              size="lg"
              onClick={handleStart} 
              disabled={!name}
              width="100%"
              fontSize="lg"
              fontWeight="bold"
              _hover={{ 
                transform: "translateY(-2px)", 
                boxShadow: "lg",
                bg: "blue.700"
              }}
              _active={{ transform: "translateY(0)" }}
              _disabled={{ 
                opacity: 0.4, 
                cursor: "not-allowed",
                bg: "gray.300",
                _hover: { transform: "none", boxShadow: "none", bg: "gray.300" }
              }}
            >
              🚀 Start Game
            </Button>
          </VStack>
        </Box>
        
        <Text fontSize="sm" color="gray.200">
          Enter your name to create a new multiplayer game
        </Text>
      </VStack>
    </Box>
  );
}
