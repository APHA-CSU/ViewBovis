import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SNPMatrixSideBar from "./SNPMatrixSideBar.jsx";
import SNPMatrixComp from "./SNPMatrixComp.jsx";
import { useState } from "react";

const SNPMatrix = () => {
  const [matrixSNPDistance, setMatrixSNPDistance] = useState(1);
  const [matrixSampleSelected, SetMatrixSampleSelected] = useState("");
  const [matrixJson, setMatrixJson] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const handlePlotMatrix = async (sample, distance) => {
    // Fetch json data from backend
    const response = await fetch(
      `/sample/matrix?sample_name=${matrixSampleSelected}&snp_distance=${matrixSNPDistance}`
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
            <SNPMatrixSideBar handlePlotMatrix={handlePlotMatrix} />
          </Col>
          <Col>
            <SNPMatrixComp
              matrixSampleSelected={matrixSampleSelected}
              matrixSNPDistance={matrixSNPDistance}
              json={matrixJson}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default SNPMatrix;
