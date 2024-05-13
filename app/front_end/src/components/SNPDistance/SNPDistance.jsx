import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhaseBanner from "@govuk-react/phase-banner";
import Link from "@govuk-react/link";
import Button from "@govuk-react/button";
import snplogo from "../../imgs/SNPPageDNA_aphaGreen.svg";
import { NavLink } from "react-router-dom";

const SNPdistance = () => {
  return (
    <Container fluid>
      {/* <!-- Government BETA Banner --> */}
      <Row>
        <PhaseBanner level="beta">
          This is a new service - your{" "}
          <Link href="https://forms.office.com/e/RXTi1RzGnF" target="_blank">
            feedback
          </Link>{" "}
          will help us to improve it.
        </PhaseBanner>
      </Row>
      {/* <!-- DNA Logo and Description -->    */}
      <Row className="align-items-center">
        {/* <!-- Column: logo --> */}
        <Col className="col-3 text-center">
          <img src={snplogo} className="snppage-logo" alt="snplogo"></img>
        </Col>
        {/* <!-- Column: description --> */}
        <Col className="col-8">
          <div className="home-description-container">
            <p className="home-description fs-5">
              <span className="text-green fw-bold">SNP Distance</span>: SNP stands
              for Single Nucleotide Polymorphism. SNPs are single changes in a
              nucleotide at a specific point in the genome (e.g. A -{`>`} T). SNP
              Distance is the number of differences between two samples; the
              fewer SNP differences, the more closely related the samples are.
            </p>
          </div>
        </Col>
      </Row>
      {/* <!-- SNP Distance Boxes --> */}
      <Row className="gx-6">
        {/* <!-- SNP Map box --> */}
        <Col>
          <div
            className="home-box"
            style={{ marginLeft: "100px", marginRight: "100px" }}
          >
            <p className="fw-bold">SNP Map</p>
            <p>
              This map will allow you to pick a sample of interest and view
              related samples using a SNP distance threshold.
            </p>
            <br></br>
            <div className="text-center">
              <Button
                as={NavLink}
                to="/snpdistance/snpmap"
                className="home-govuk-buttons"
                buttonColour="#00a33b"
              >
                View Map
              </Button>
            </div>
          </div>
        </Col>
        {/* <!-- SNP Matrix box --> */}
        <Col>
          <div
            className="home-box"
            style={{ marginLeft: "100px", marginRight: "100px" }}
          >
            <p className="fw-bold">SNP Matrix</p>
            <p>
              Visualise a pairwise SNP matrix containing a target sample and
              related samples. Each pairwise comparison displays the SNP
              difference between two samples.
            </p>
            <div className="text-center">
              <Button
                as={NavLink}
                to="/snpdistance/snpmatrix"
                className="home-govuk-buttons"
                buttonColour="#00a33b"
              >
                View Matrix
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      {/* <!-- Government Footer --> */}
      <Row className="footer">
        <div className="d-flex justify-content-between">
          <div className="text-start footer-text">
            Service developed and maintained by APHA Science
          </div>
          <div>
            <a
              className="text-end text-decoration-underline text-hyperlink px-3"
              href="https://teams.microsoft.com/l/team/19%3aWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2/conversations?groupId=9f4fc917-23c7-4ba4-b8ce-155c744d0152&tenantId=770a2450-0227-4c62-90c7-4e38537f1102"
              target="_blank"
            >
              Technical Support
            </a>
            {/* // <!-- Accessibility Statement  */}
            <a
              className="text-end text-decoration-underline text-hyperlink"
              href="#home"
            >
              Accessibility Statement
            </a>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default SNPdistance;
