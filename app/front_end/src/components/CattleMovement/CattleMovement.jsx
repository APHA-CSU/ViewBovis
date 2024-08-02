import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapSidebar from "./CattlMovMapSidebar";
import CattleMovementMap from "./CattleMovementMap";
import "./CattleMovement.css";
import Collapse from "react-bootstrap/Collapse";
import { useSelector } from "react-redux";

const CattleMovement = () => {
  const movementData = useSelector(
    (state) => state.movement.cattleMovementDataset
  );
  const [jsonData, setjsonData] = useState({});
  const [countyAndHotspotLayers, setCountyAndHotspotLayers] = useState({
    hotspotLayers: false,
    countyLayers: false,
  });
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
    }
    setCheckedLayers({ ...checkedLayers });
  };

  const [searchSecondSample, setSearchSecondSample] = useState("");
  const [secondJsonData, setSecondjsonData] = useState({});


  //Fetch second sample data and store in secondJsonData
  useEffect(() => {
    if (searchSecondSample)
      fetch(`/sample/movements?sample_name=${searchSecondSample}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSecondjsonData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, [searchSecondSample]);

  useEffect(()=> {
    if(Object.keys(movementData).length > 0) setjsonData(movementData);
  },[movementData])

  return (
    <div className="container-fluid content">
      <Container fluid id="custom-container" data-testid="cattlemovement-1">
        <Row>
          <Collapse in={openSideBar}>
            <Col className="sidebar col-3">
              <MapSidebar
                handleCheckboxes={handleCheckboxes}
                checkedLayers={checkedLayers}
                setSearchSecondSample={setSearchSecondSample}
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
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CattleMovement;
