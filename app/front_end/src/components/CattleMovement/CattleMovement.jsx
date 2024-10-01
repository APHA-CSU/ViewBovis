import { useState, Suspense } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapSidebar from "./CattlMovMapSidebar";
import "./CattleMovement.css";
import Collapse from "react-bootstrap/Collapse";
import { useSelector } from "react-redux";
import LoadingScreen from "../Utilities/LoadingScreen.jsx";

const CattleMovement = ({ RiskLayers, CountyLayers, HotspotLayers, CattleMovementMap }) => {
  const showCattleMovementPage = useSelector(
    (state) => state.security.showCattleMovementPage
  );
  const [countyAndHotspotLayers, setCountyAndHotspotLayers] = useState({});
  const [openSideBar, setOpenSideBar] = useState(true);
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
    <div
      className={showCattleMovementPage ? "container-fluid content" : "hidden"}
    >
      <Suspense fallback={<LoadingScreen message="Loading map tiles"/>}>
      <Row>
        <Collapse in={openSideBar}>
          <Col className="sidebar col-3">
            <MapSidebar
              handleCheckboxes={handleCheckboxes}
              checkedLayers={checkedLayers}
              countyAndHotspotLayers={countyAndHotspotLayers}
              setCountyAndHotspotLayers={setCountyAndHotspotLayers}
            />
          </Col>
        </Collapse>
        <Col>
          <CattleMovementMap
            checkedLayers={checkedLayers}
            useCountyandHotspotLayers={countyAndHotspotLayers}
            setOpenSideBar={setOpenSideBar}
            openSideBar={openSideBar}
            RiskLayers={RiskLayers}
            CountyLayers={CountyLayers}
            HotspotLayers={HotspotLayers}
          />
        </Col>
      </Row>
      </Suspense>
    </div>
  );
};

export default CattleMovement;
