import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SNPMapSidebar from "../SNPDistance/SNPMapSidebar";
import SNPMapComp from "./SNPMapComp";

const SNPMap = () => {
  const [searchSnp, setsearchSnp] = useState("");
  // const [jsonData, setjsonData] = useState({});

  useEffect(() => {
    fetch(`/sample/movements?sample_name=${searchSnp}`)
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
  }, [searchSnp]);

  return (
    <Container fluid id="custom-container">
      <Row>
        <Col className="sidebar col-3">
          <SNPMapSidebar setsearchSnp={setsearchSnp} />
        </Col>
        <Col>
          <SNPMapComp />
        </Col>
      </Row>
    </Container>
  );
};

export default SNPMap;