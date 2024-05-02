import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import "./App.css";
import Home from "./components/Home/Home";
import CattleMovement from "./components/CattleMovement/CattleMovement";
import SNPdistance from "./components/SNPDistance/SNPDistance";
import SNPMap from "./components/SNPDistance/SNPMap";
import SNPMatrix from "./components/SNPDistance/SNPMatrix";
import Nextstrain from "./components/Nextstrain/Nextstrain";
import NavbarComp from "./components/Navbar/NavbarComp";

function App() {
  return (
    <Container fluid className="app">
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cattlemovement" element={<CattleMovement />} />
        <Route path="/snpdistance" element={<SNPdistance />} />
        <Route path="/snpdistance/snpmap" element={<SNPMap />} />
        <Route path="/snpdistance/snpmatrix" element={<SNPMatrix />} />
        <Route path="/nextstrain" element={<Nextstrain />} />
      </Routes>
    </Container>
  );
}

export default App;
