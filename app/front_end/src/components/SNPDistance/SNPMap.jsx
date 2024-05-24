import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SNPMapSidebar from "../SNPDistance/SNPMapSidebar";
import SNPMapComp from "./SNPMapComp";

const SNPMap = () => {
  const [SNPMapDataset, setSNPMapDataset] = useState({})

  const fetchSNPMapDataset = (search_sample,snp_distance) => {
  fetch(`/sample/related?sample_name=${search_sample}&snp_distance=${snp_distance}`)
  .then(res => {
    if(!res.ok) {
      console.error(res)
      return null
  }
    else return res.json()
  })
  .then(res => {
    if(res) setSNPMapDataset(res)
    }).catch((error) => {
    console.error("Error fetching data:", error);
  });
  }
  // const [jsonData, setjsonData] = useState({});

  return (
    <Container fluid id="custom-container">
      <Row>
        <Col className="sidebar col-3">
          <SNPMapSidebar fetchSNPMapDataset={fetchSNPMapDataset} />
        </Col>
        <Col>
          <SNPMapComp SNPMapDataset={SNPMapDataset} />
        </Col>
      </Row>
    </Container>
  );
};

export default SNPMap;