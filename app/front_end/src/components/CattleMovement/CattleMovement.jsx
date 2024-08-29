import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapSidebar from "./CattlMovMapSidebar";
import "./CattleMovement.css";
import Collapse from "react-bootstrap/Collapse";
import { useSelector, useDispatch } from "react-redux";
import {
  setMovementCheckedLayers,
  setMovementCountyandHotspotLayers,
} from "./../../features/counter/movementSlice.js";
import CattleMovementMap from "./CattleMovementMap.jsx";

const CattleMovement = ({ RiskLayers, CountyLayers, HotspotLayers }) => {
  const movementData = useSelector(
    (state) => state.movement.cattleMovementDataset
  );
  const openMovementSidebar = useSelector(
    (state) => state.movement.openMovementSidebar
  );
  const secondMovementData = useSelector(
    (state) => state.movement.secondMovementDataset
  );
  const movementCheckedLayers = useSelector(
    (state) => state.movement.movementCheckedLayers
  );
  const movementCountyandHotspotLayers = useSelector(
    (state) => state.movement.movementCountyandHotspotLayers
  );
  const [jsonData, setjsonData] = useState({});
  const [countyAndHotspotLayers, setCountyAndHotspotLayers] = useState({
    ...movementCountyandHotspotLayers,
  });
  const [openSideBar, setOpenSideBar] = useState(true);
  const [checkedLayers, setCheckedLayers] = useState({
    ...movementCheckedLayers,
  });
  const dispatch = useDispatch();

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

  const [secondJsonData, setSecondjsonData] = useState({});

  useEffect(() => {
    if (Object.keys(movementData).length > 0) setjsonData(movementData);
  }, [movementData]);

  useEffect(() => {
    if (Object.keys(secondMovementData).length > 0)
      setSecondjsonData(secondMovementData);
  }, [secondMovementData]);

  useEffect(() => {
    dispatch(setMovementCheckedLayers({ ...checkedLayers }));
  }, [checkedLayers]);

  useEffect(() => {
    dispatch(setMovementCountyandHotspotLayers({ ...countyAndHotspotLayers }));
  }, [countyAndHotspotLayers]);

  return (
    <div className="container-fluid content">
      <Row>
        <Collapse in={openMovementSidebar}>
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
            jsonData={jsonData}
            checkedLayers={checkedLayers}
            secondJsonData={secondJsonData}
            useCountyandHotspotLayers={countyAndHotspotLayers}
            setOpenSideBar={setOpenSideBar}
            openSideBar={openSideBar}
            RiskLayers={RiskLayers}
            CountyLayers={CountyLayers}
            HotspotLayers={HotspotLayers}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CattleMovement;
