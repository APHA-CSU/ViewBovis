import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import "./App.css";
import Home from "./components/Home/Home";
import CattleMovement from "./components/CattleMovement/CattleMovement";
import NavbarComp from "./components/Navbar/NavbarComp";

function App() {
  return (
    <Container fluid className="app">
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cattlemovement" element={<CattleMovement />} />
      </Routes>
    </Container>
  );
}

export default App;