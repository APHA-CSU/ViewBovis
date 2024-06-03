import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapSidebar from "./CattlMovMapSidebar";
import CattleMovementMap from "./CattleMovementMap";

const CattleMovement = ({ riskAreas, styleRiskArea }) => {
  const [searchSample, setSearchSample] = useState("");
  const [jsonData, setjsonData] = useState({});
  const [showRiskAreas, setShowRiskAreas] = useState(false);

  const handleRiskBoxClick = () => {
    setShowRiskAreas(!showRiskAreas);
  };

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

  return (
    <Container fluid id="custom-container" data-testid="cattlemovement-1">
      <Row>
        <Col className="sidebar col-3">
          <MapSidebar
            setSearchSample={setSearchSample}
            handleClick={handleRiskBoxClick}
          />
        </Col>
        <Col>
          <CattleMovementMap
            jsonData={jsonData}
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
