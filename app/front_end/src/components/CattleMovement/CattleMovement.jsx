import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapSidebar from "../MapSidebar/MapSidebar";
import CattleMovementMap from "./CattleMovementMap";

const CattleMovement = () => {
  const [searchSample, setSearchSample] = useState("");
  const [jsonData, setjsonData] = useState({});
  console.log(jsonData);
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
          <MapSidebar setSearchSample={setSearchSample} />
        </Col>
        <Col>
          <CattleMovementMap jsonData={jsonData} />
        </Col>
      </Row>
    </Container>
  );
};

export default CattleMovement;
