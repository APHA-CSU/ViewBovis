import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapSidebar from "./CattlMovMapSidebar";
import CattleMovementMap from "./CattleMovementMap";
import "./CattleMovement.css";
import allRiskAreas from "../../data/riskAreas.json";

const CattleMovement = () => {
  const [searchSample, setSearchSample] = useState("");
  const [jsonData, setjsonData] = useState({});
  const [searchSecondSample, setSearchSecondSample] = useState("");
  const [secondJsonData, setSecondjsonData] = useState({});
  const [riskAreas, setRiskAreas] = useState([]);
  const [showRiskAreas, setShowRiskAreas] = useState(false); 
  
  //Fetch sample data and store in jsonData
  useEffect(() => {
    if (searchSample)
      fetch(`/sample/movements?sample_name=${searchSample}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setjsonData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, [searchSample]);

  //Fetch second sample data and store in secondJsonData
  useEffect(() => {
    if (searchSecondSample)
      fetch(`/sample/movements?sample_name=${searchSecondSample}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSecondjsonData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, [searchSecondSample]);

  class LoadAreasTask {
    load = (setState) => {
      setState(allRiskAreas);
    };
  }

  useEffect(() => {
    const loadAreasTask = new LoadAreasTask();
    loadAreasTask.load(setRiskAreas);
  });

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

  const handleRiskBoxClick = () => {
    setShowRiskAreas(!showRiskAreas);
  };

  return (
    <Container fluid id="custom-container" data-testid="cattlemovement-1">
      <Row>
        <Col className="sidebar col-3">
          <MapSidebar
            setSearchSample={setSearchSample}
            setSearchSecondSample={setSearchSecondSample}
            handleRiskBoxClick={handleRiskBoxClick}
            showRiskAreas={showRiskAreas}
          />
        </Col>
        <Col>
          <CattleMovementMap
            jsonData={jsonData}
            secondJsonData={secondJsonData}
            showRiskAreas={showRiskAreas}
            riskAreas={showRiskAreas ? riskAreas : null}
            styleRiskArea={showRiskAreas ? styleRiskArea : null}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CattleMovement;
