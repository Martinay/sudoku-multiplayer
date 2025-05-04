import Home from "./pages/Home";
import Game from "./pages/Game";
import { Provider } from "urql";
import { client } from "./graphql/client";
import { Center, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <Provider value={client}>
      <ChakraProvider value={defaultSystem}>
        <Center h="100vh" w="100vw">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sudoku/:gameId" element={<Game />} />
            </Routes>
          </BrowserRouter>
        </Center>
      </ChakraProvider>
    </Provider>
  );
}
