import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapSidebar from "./CattlMovMapSidebar";
import CattleMovementMap from "./CattleMovementMap";
import "./CattleMovement.css";
import allRiskAreas from "../../data/riskAreas.json";
import highRiskAreas from "../../data/riskAreas.json";

const CattleMovement = () => {
  const [searchSample, setSearchSample] = useState("");
  const [jsonData, setjsonData] = useState({});
  const [riskAreas, setRiskAreas] = useState([]); //change to showAllriskareas
  const [showRiskAreas, setShowRiskAreas] = useState(false); //change to showAllriskareas
  // const [highRiskAreas, setHighRiskAreas] = useState([])
  const [checkedLayersState, setcheckedLayersState] = useState({})
  let showAllRA = false
  let showHRA = false
  let showLRA = false
  let showEdgeRA= false
  let showHTBA = false
  let showITBA = false
  let showLTBA = false
  let showTBFA = false
  let checkedLayers = {}

  const handleCheckboxes = (index) => {
    if(index === 0){
      showAllRA = !(showAllRA)
      checkedLayers["showAllRA"] =  showAllRA
    } 
    if (index === 1) {
      showHRA = !(showHRA)
      checkedLayers["showHRA"] =  showHRA
    }
    if (showLRA) {
      checkedLayers.push([{"showLRA": true}])
    }
    if (showEdgeRA) {
      checkedLayers.push([{"showEdgeRA": true}])
    }
    if (showHTBA) {
      checkedLayers.push(prevArr => [...prevArr,{"showHTBA": true}])
    }
    if (showLTBA) {
      checkedLayers(prevArr => [...prevArr,{"showLTBA": true}])
    }
    if (showITBA) {
      checkedLayers(prevArr => [...prevArr,{"showITBA": true}])
    }
    if (showTBFA) {
      checkedLayers(prevArr => [...prevArr,{"showTBFA": true}])
    }
    console.log(checkedLayers)
    setcheckedLayersState({...checkedLayers})
  }


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
          // console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, [searchSample]);

  class LoadAreasTask {
    load = (setState, showRiskAreas, showHRA) => {
      if (showRiskAreas) {
        setState(allRiskAreas);
      } else if (showHRA) {
        setState(highRiskAreas);
      } else {
        setState([]);
      }
    };
  }

  useEffect(() => {
    const loadAreasTask = new LoadAreasTask();
    loadAreasTask.load(setRiskAreas, showRiskAreas, showHRA);
  }, [showRiskAreas, showHRA]);

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

  const handleHRABoxCLick = () => {
    //setShowHRA(!showHRA);
  };

  return (
    <Container fluid id="custom-container" data-testid="cattlemovement-1">
      <Row>
        <Col className="sidebar col-3">
          <MapSidebar
            setSearchSample={setSearchSample}
            handleRiskBoxClick={handleRiskBoxClick}
            handleHRABoxCLick={handleHRABoxCLick}
            showRiskAreas={showRiskAreas}
            handleCheckboxes = {handleCheckboxes}
            showAllRA = {showAllRA}
            showHRA = {showHRA}
          />
        </Col>
        <Col>
          <CattleMovementMap
            jsonData={jsonData}
            showRiskAreas={showRiskAreas}
            riskAreas={showRiskAreas || showHRA ? riskAreas : null}
            styleRiskArea={showRiskAreas || showHRA ? styleRiskArea : null}
            checkedLayers={checkedLayersState}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CattleMovement;
