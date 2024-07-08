import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SNPMatrixSideBar from "./SNPMatrixSideBar.jsx";
import SNPMatrixComp from "./SNPMatrixComp.jsx";
import { useState } from "react";

const SNPMatrix = () => {
  const [snpMatrixOptions, setSNPMatrixOptions] = useState({
    sample: "",
    snp_distance: 1,
  });
  const [matrixJson, setMatrixJson] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const handlePlotMatrix = async () => {
    // Fetch json data from backend
    const response = await fetch(
      `/sample/matrix?sample_name=${snpMatrixOptions["sample"]}&snp_distance=${snpMatrixOptions["snp_distance"]}`
    );

    if (!response.ok) {
      setErrorMessage("Server Error");
    } else {
      const json = await response.json();

      // Remove spinner when fetch is complete
      //document.getElementById("snpmatrix-spinner").classList.add("hidden");

      // If response contains a warning
      if (json["warnings"]) {
        setErrorMessage(`
          <p class="warning-text" style="white-space:pre" id="snpmatrix-error-message">${json["warning"]}</p>
        `);
      } else {
        setMatrixJson(json);
      }
    }
  };
  return (
    <div className="container-fluid content">
      <Container fluid id="custom-container">
        <Row>
          <Col className="sidebar col-3">
            <SNPMatrixSideBar
              handlePlotMatrix={handlePlotMatrix}
              snpMatrixOptions={snpMatrixOptions}
              setSNPMatrixOptions={setSNPMatrixOptions}
            />
          </Col>
          <Col>
            <div className="col-9" id="snpmatrix-container">
              <div
                id="snpmatrix"
                style={{ marginTop: "10px" }}
              ></div>
            </div>
            <SNPMatrixComp
              json={matrixJson}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default SNPMatrix;
