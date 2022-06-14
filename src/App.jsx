import React from "react";
import Title from "./pages/title/Title";
import Register from "./pages/ordenService/OrdenService";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Title />
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>

  );
}

export default App;
