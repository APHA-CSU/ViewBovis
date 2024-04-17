import { Routes, Route } from "react-router-dom";
import  Home  from "./components/Home/Home";
import  CattleMovement  from "./components/CattleMovement";
import "./App.css";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cattlemovement" element={<CattleMovement />} />
    </Routes>
  );
}

export default App;
