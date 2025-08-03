import Home from "./pages/Home";
import Game from "./pages/Game";
import { Provider } from "urql";
import { client } from "./graphql/client";
import { Box, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <Provider value={client}>
      <ChakraProvider value={defaultSystem}>
        <Box 
          minH="100vh" 
          w="100vw" 
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sudoku/:gameId" element={<Game />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </Provider>
  );
}
