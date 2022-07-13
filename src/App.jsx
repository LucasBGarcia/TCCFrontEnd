import React from "react";
import Title from "./pages/title/Title";
import Login from "./pages/login/Login"
import Home from "./pages/ordenService/OrdenService";
import Grafico from "./pages/charts/chart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Title />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chart" element={<Grafico />} />
      </Routes>
    </Router>

  );
}

export default App;
