import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SNPMapSidebar from "../SNPDistance/SNPMapSidebar";
import SNPMapComp from "./SNPMapComp";

const SNPMap = () => {
  const [SNPMapDataset, setSNPMapDataset] = useState({})
  const [countyLayers, setCountyLayers] = useState(false)

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

  const [checkedLayers, setCheckedLayers] = useState({})

  const handleCheckboxes = (index) => {
    switch(index) {
      case 0:
        checkedLayers["showAllRA"] = !checkedLayers["showAllRA"]
        checkedLayers["High Risk Area"] = checkedLayers["showAllRA"];
        checkedLayers["Low Risk Area"] = checkedLayers["showAllRA"];
        checkedLayers["Edge Area"] = checkedLayers["showAllRA"];
        checkedLayers["High TB Area"] = checkedLayers["showAllRA"];
        checkedLayers["Intermediate TB Area"] = checkedLayers["showAllRA"];
        checkedLayers["Low TB Area"] = checkedLayers["showAllRA"];
        checkedLayers["TB Free Area"] = checkedLayers["showAllRA"];
        break;
      case 1:
        checkedLayers["High Risk Area"] =  !checkedLayers["High Risk Area"];
        break;
      case 2:
        checkedLayers["Low Risk Area"] =  !checkedLayers["Low Risk Area"];
        break;
      case 3:
        checkedLayers["Edge Area"] = !checkedLayers["Edge Area"];
        break;
      case 4:
        checkedLayers["High TB Area"] = !checkedLayers["High TB Area"];
        break;
      case 5:
        checkedLayers["Intermediate TB Area"] = !checkedLayers["Intermediate TB Area"];
        break;
      case 6:
        checkedLayers["Low TB Area"] = !checkedLayers["Low TB Area"];
        break;
      case 7:
        checkedLayers["TB Free Area"] = !checkedLayers["TB Free Area"];
        break;
  }
    setCheckedLayers({...checkedLayers})
  }

  return (
    <Container fluid id="custom-container">
      <Row>
        <Col className="sidebar col-3">
          <SNPMapSidebar fetchSNPMapDataset={fetchSNPMapDataset} checkedLayers={checkedLayers} 
          handleCheckboxes={handleCheckboxes} countyLayers={countyLayers} setCountyLayers={setCountyLayers} />
        </Col>
        <Col>
          <SNPMapComp SNPMapDataset={SNPMapDataset} checkedLayers={checkedLayers} useCountyLayers={countyLayers} />
        </Col>
      </Row>
    </Container>
  );
};

export default SNPMap;