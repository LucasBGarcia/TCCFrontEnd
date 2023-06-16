import { Route, Routes } from "react-router-dom";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import Relatorio from "../component/Relatorio/Relatorio";
import Grafico from "../component/charts/chart";
import SetMarcasModelos from "../component/setMarcasModelos/setMarcasModelos";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chart" element={<Grafico />} />
      <Route path="/Relatorio" element={<Relatorio />} />
      <Route path="/setMarcasModelos" element={<SetMarcasModelos />} />
    </Routes>
  );
}

export default Rotas;
