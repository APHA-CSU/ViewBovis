import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SNPMapSidebar from "../SNPDistance/SNPMapSidebar";
import SNPMapComp from "./SNPMapComp";
import Collapse from "react-bootstrap/Collapse";
import SNPTable from "./SNPTable";
import './SNPMap.css'
import {useSelector} from 'react-redux'


const SNPMap = () => {
  const [SNPMapDataset, setSNPMapDataset] = useState({});
  const snpSearchInput = useSelector(state => state.counter.snpSearchInput)
  const snpDistance = useSelector(state => state.counter.snpDistance)
  const [openTable,setOpenTable] = useState(false)
  const [OpenSideBar, setOpenSideBar] = useState(true);
  const [countyAndHotspotLayers, setCountyAndHotspotLayers] = useState({
    hotspotLayers: false,
    countyLayers: false,
  });
  const openSNPSidebar = useSelector((state)=> state.counter.openSNPSidebar)
  const [checkedLayers, setCheckedLayers] = useState({});
  const fetchSNPMapDataset = (search_sample, snp_distance) => {
    fetch(
      `/sample/related?sample_name=${search_sample}&snp_distance=${snp_distance}`
    )
      .then((res) => {
        if (!res.ok) {
          console.error(res);
          return null;
        } else return res.json();
      })
      .then((res) => {
        if (res) {
          setSNPMapDataset(res)};
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCheckboxes = (index) => {
    switch (index) {
      case 0:
        checkedLayers["showAllRA"] = !checkedLayers["showAllRA"];
        checkedLayers["High Risk Area"] = checkedLayers["showAllRA"];
        checkedLayers["Low Risk Area"] = checkedLayers["showAllRA"];
        checkedLayers["Edge Area"] = checkedLayers["showAllRA"];
        checkedLayers["High TB Area"] = checkedLayers["showAllRA"];
        checkedLayers["Intermediate TB Area"] = checkedLayers["showAllRA"];
        checkedLayers["Low TB Area"] = checkedLayers["showAllRA"];
        checkedLayers["TB Free Area"] = checkedLayers["showAllRA"];
        break;
      case 1:
        checkedLayers["High Risk Area"] = !checkedLayers["High Risk Area"];
        break;
      case 2:
        checkedLayers["Low Risk Area"] = !checkedLayers["Low Risk Area"];
        break;
      case 3:
        checkedLayers["Edge Area"] = !checkedLayers["Edge Area"];
        break;
      case 4:
        checkedLayers["High TB Area"] = !checkedLayers["High TB Area"];
        break;
      case 5:
        checkedLayers["Intermediate TB Area"] =
          !checkedLayers["Intermediate TB Area"];
        break;
      case 6:
        checkedLayers["Low TB Area"] = !checkedLayers["Low TB Area"];
        break;
      case 7:
        checkedLayers["TB Free Area"] = !checkedLayers["TB Free Area"];
        break;
    }
    setCheckedLayers({ ...checkedLayers });
  };

  useEffect(()=>{
    if(snpSearchInput) fetchSNPMapDataset(snpSearchInput,snpDistance)
  },[snpSearchInput,snpDistance])

  return (
    <div className="container-fluid content">
      <Container fluid id="custom-container">
        <Row>
          <Collapse in={openSNPSidebar} dimension={"width"}>
            <Col className="sidebar col-3">
              <SNPMapSidebar
                fetchSNPMapDataset={fetchSNPMapDataset}
                checkedLayers={checkedLayers}
                handleCheckboxes={handleCheckboxes}
                countyAndHotspotLayers={countyAndHotspotLayers}
                setCountyAndHotspotLayers={setCountyAndHotspotLayers}
              />
            </Col>
          </Collapse>
          <Col>
            <SNPMapComp
              SNPMapDataset={SNPMapDataset}
              checkedLayers={checkedLayers}
              useCountyandHotspotLayers={countyAndHotspotLayers}
              setOpenSideBar={setOpenSideBar}
              openSideBar={OpenSideBar}
              setOpenTable={setOpenTable}
              openTable={openTable}
            />
          </Col>
          <Collapse in={openTable}>
           <Col className="sidebar-table col-4">
           {Object.keys(SNPMapDataset).length > 0 && <SNPTable
                json={SNPMapDataset}
              />}
           </Col>
          </Collapse>
        </Row>
      </Container>
    </div>
  );
};

export default SNPMap;
