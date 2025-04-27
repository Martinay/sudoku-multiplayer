import Home from "./pages/Home";
import Game from "./pages/Game";
import { Provider } from "urql";
import { client } from "./graphql/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <Provider value={client}>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sudoku/:gameId" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}
