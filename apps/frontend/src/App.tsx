import Home from "./pages/Home";
import Game from "./pages/Game";
import { Provider } from "urql";
import { client } from "./graphql/client";
import { Box, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ErrorBoundary } from "./components/ui";

export default function App() {
  return (
    <ErrorBoundary>
      <Provider value={client}>
        <ChakraProvider value={defaultSystem}>
          <Box 
            minH="100vh" 
            w="100vw" 
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            display="flex"
            alignItems={{ base: "flex-start", md: "center" }}
            justifyContent="center"
            overflowX="hidden"
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
    </ErrorBoundary>
  );
}
