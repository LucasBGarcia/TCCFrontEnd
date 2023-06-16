import { ChakraProvider } from "@chakra-ui/react";
//import "./App.css";
import React from "react";
import Rotas from "./Routes/Rotas";
import { MenuProvider } from "./context/MenuContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <MenuProvider>
      <ChakraProvider>
        <ToastContainer />
        <Rotas />
      </ChakraProvider>
    </MenuProvider>
  );
}

export default App;
