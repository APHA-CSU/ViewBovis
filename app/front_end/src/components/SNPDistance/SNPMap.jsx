import { Suspense, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SNPMapSidebar from "./SNPMapSidebar.jsx";
import Collapse from "react-bootstrap/Collapse";
import SNPTable from "./SNPTable.jsx";
import "./SNPMap.css";
import { useSelector } from "react-redux";
import LoadingScreen from "../Utilities/LoadingScreen.jsx";

const SNPMap = ({ RiskLayers, CountyLayers, HotspotLayers, SNPMapComp }) => {
  const SNPMapDataset = useSelector((state) => state.counter.snpDataset);
  const showSNPmapPage = useSelector((state) => state.security.showSNPmapPage);
  const openTable = useSelector((state) => state.counter.openSNPTable);
  const [OpenSideBar, setOpenSideBar] = useState(true);
  const [countyAndHotspotLayers, setCountyAndHotspotLayers] = useState({});
  const [checkedLayers, setCheckedLayers] = useState({});

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
      default:
        break;
    }
    setCheckedLayers({ ...checkedLayers });
  };

  return (
    <div className={showSNPmapPage ? "container-fluid content" : "hidden"}>
      <Suspense fallback={<LoadingScreen message="Loading map tiles" />}>
        <Container fluid id="custom-container">
          <Row>
            <Collapse in={OpenSideBar} dimension={"width"}>
              <Col className="sidebar col-3">
                <SNPMapSidebar
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
                RiskLayers={RiskLayers}
                CountyLayers={CountyLayers}
                HotspotLayers={HotspotLayers}
              />
            </Col>
            <Collapse in={openTable}>
              <Col className="col-4" id="table-sidebar-container">
                {Object.keys(SNPMapDataset).length > 0 && (
                  <SNPTable json={SNPMapDataset} />
                )}
              </Col>
            </Collapse>
          </Row>
        </Container>
      </Suspense>
    </div>
  );
};

export default SNPMap;
