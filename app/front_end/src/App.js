import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import CattleMovement from "./components/CattleMovement/CattleMovement";
import SNPdistance from "./components/SNPDistance/SNPDistance";
import SNPMap from "./components/SNPDistance/SNPMap";
import SNPMatrix from "./components/SNPDistance/SNPMatrix";
import Nextstrain from "./components/Nextstrain/Nextstrain";
import HelpSupport from "./components/HelpSupport/HelpSupport";
import NavbarComp from "./components/Navbar/NavbarComp";
import LoadAreasTask from "./tasks/LoadAreasTask";

function App() {
  const [riskAreas, setRiskAreas] = useState([]);

  const load = () => {
    const loadAreasTask = new LoadAreasTask();
    loadAreasTask.load(setRiskAreas);
  };

  useEffect(load, []);

  // Function to set polygon colours for Risk Areas
  const riskAreaCols = (area) => {
    if (area === "High Risk Area" || area === "High TB Area") return "#C62828";
    else if (area === "Intermediate TB Area" || area === "Edge Area")
      return "orange";
    else if (area === "Low Risk Area" || area === "Low TB Area")
      return "#00C853";
    else if (area === "TB Free Area") return "#CFD8DC";
    return "#CFD8DC";
  };

  // Function to set custom styles for Risk Area polygons. "feature" object obtained from GeoJSON react-leaflet component used in CattleMovementMap.jsx.
  const styleRiskArea = (feature) => {
    const area = feature.properties.TB_Area;

    return {
      fillColor: riskAreaCols(area),
      weight: 1.5,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };

  return (
    <Container fluid className="app">
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cattlemovement"
          element={
            <CattleMovement
              riskAreas={riskAreas}
              styleRiskArea={styleRiskArea}
            />
          }
        />
        <Route path="/snpdistance" element={<SNPdistance />} />
        <Route path="/snpdistance/snpmap" element={<SNPMap />} />
        <Route path="/snpdistance/snpmatrix" element={<SNPMatrix />} />
        <Route path="/nextstrain" element={<Nextstrain />} />
        <Route path="/helpsupport" element={<HelpSupport />} />
      </Routes>
    </Container>
  );
}

export default App;
