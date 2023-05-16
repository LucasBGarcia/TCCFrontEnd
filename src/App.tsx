import { ChakraProvider } from "@chakra-ui/react";
//import "./App.css";
import React from "react";
import Rotas from "./Routes/Rotas";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <MenuProvider>
      <ChakraProvider>
        <Rotas />
      </ChakraProvider>
    </MenuProvider>
  );
}

export default App;
