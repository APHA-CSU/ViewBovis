import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapSidebar from "../Sidebar/MapSidebar";
import CattleMovementMap from "./CattleMovementMap";

const CattleMovement = () => {
  const [searchSample, setSearchSample] = useState("");
  // const [jsonData, setjsonData] = useState({});

  useEffect(() => {
    fetch(`/sample/movements?sample_name=${searchSample}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then(({ data }) => {
        // setjsonData(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchSample]);

  return (
    <Container fluid id="custom-container">
      <Row>
        <Col className="sidebar col-3">
          <MapSidebar setSearchSample={setSearchSample} />
        </Col>
        <Col>
          <CattleMovementMap />
        </Col>
      </Row>
    </Container>
  );
};

export default CattleMovement;