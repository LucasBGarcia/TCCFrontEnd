import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Grafico from "../component/charts/chart";
import Finances from "../pages/tables/Finances";
import Login from "../component/Login/Login";
import Relatorio from "../component/Relatorio/Relatorio";
import SetMarcasModelos from "../component/setMarcasModelos/setMarcasModelos";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/finances" element={<Finances />} />
      <Route path="/chart" element={<Grafico />} />
      <Route path="/Relatorio" element={<Relatorio />} />
      <Route path="/setMarcasModelos" element={<SetMarcasModelos />} />
    </Routes>
  );
}

export default Rotas;
