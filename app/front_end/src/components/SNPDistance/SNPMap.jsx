import { Suspense, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SNPMapSidebar from "./SNPMapSidebar.jsx";
import Collapse from "react-bootstrap/Collapse";
import SNPTable from "./SNPTable.jsx";
import "./SNPMap.css";
import { useSelector, useDispatch } from "react-redux";
import { setSNPmapWarnings } from "../../features/counter/counterSlice.js";
import LoadingScreen from "../Utilities/LoadingScreen.jsx";

const SNPMap = ({ RiskLayers, CountyLayers, HotspotLayers, SNPMapComp }) => {
  const [SNPMapDataset, setSNPMapDataset] = useState({});
  const [spinner, setSpinner] = useState(false);
  const showSNPmapPage = useSelector((state) => state.security.showSNPmapPage);
  const dispatch = useDispatch();
  const openTable = useSelector((state) => state.counter.openSNPTable);
  const [OpenSideBar, setOpenSideBar] = useState(true);
  const [countyAndHotspotLayers, setCountyAndHotspotLayers] = useState({});
  const [checkedLayers, setCheckedLayers] = useState({});
  const fetchSNPMapDataset = (search_sample, snp_distance) => {
    if (search_sample.length > 0) {
      setSpinner(true);
      fetch(
        `/sample/related?sample_name=${search_sample}&snp_distance=${snp_distance}`
      )
        .then((res) => {
          if (!res.ok) {
            console.error(res);
            return {};
          } else return res.json();
        })
        .then((res) => {
          if (Object.keys(res).length > 0) {
            if (res["warnings"]) {
              setSNPMapDataset({});
              dispatch(setSNPmapWarnings(res["warning"]));
            } else {
              setSNPMapDataset(res);
              dispatch(setSNPmapWarnings(null));
            }
          } else {
            setSNPMapDataset({});
            dispatch(
              setSNPmapWarnings(
                "Something went wrong: Please report the sample and snp distance <a referrerpolicy='no-referrer' target='_blank' href='https://teams.microsoft.com/l/channel/19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2/General?groupId=9f4fc917-23c7-4ba4-b8ce-155c744d0152&tenantId='>here</a>"
              )
            );
          }
        })
        .then(() => {
          setSpinner(false);
        })
        .catch((error) => {
          setSNPMapDataset({});
          setSpinner(false);
          dispatch(setSNPmapWarnings("Request failed"));
          console.error("Error fetching data:", error);
        });
    }
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
                  fetchSNPMapDataset={fetchSNPMapDataset}
                  checkedLayers={checkedLayers}
                  handleCheckboxes={handleCheckboxes}
                  countyAndHotspotLayers={countyAndHotspotLayers}
                  setCountyAndHotspotLayers={setCountyAndHotspotLayers}
                  spinner={spinner}
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
