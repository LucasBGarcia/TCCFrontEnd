import React from "react";
import Title from "./pages/title/Title"
import Register from "./pages/client/Client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Title />
      <Routes>
        <Route path="/clients" element={<Register />} />
      </Routes>
    </Router>

  );
}

export default App;
