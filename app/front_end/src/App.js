import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./App.css";
import Home from "./components/Home/Home";
import CattleMovement from "./components/CattleMovement/CattleMovement";
import SNPMap from "./components/SNPDistance/SNPMap";
import Nextstrain from "./components/Nextstrain/Nextstrain";
import HelpSupport from "./components/HelpSupport/HelpSupport";
import NavbarComp from "./components/Navbar/NavbarComp";
import SecurityModal from "./components/SecurityModal/SecurityModal";

function App() {
  return (
    <Container fluid className="app">
      <SecurityModal />
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cattlemovement" element={<CattleMovement />} />
        <Route path="/snpmap" element={<SNPMap />} />
        <Route path="/nextstrain" element={<Nextstrain />} />
        <Route path="/helpsupport" element={<HelpSupport />} />
      </Routes>
    </Container>
  );
}

export default App;
