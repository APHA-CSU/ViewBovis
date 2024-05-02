import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhaseBanner from "@govuk-react/phase-banner";
import Link from "@govuk-react/link";
import Button from "@govuk-react/button";
import Table from "@govuk-react/table";
import img from "../../imgs/VBIcon16_APHAGreen.svg";
import { NavLink } from "react-router-dom";

const Home = () => {
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
      {/* <!-- ViewBovis Logo and Description --> */}
      <Row className="align-items-center">
        {/* <!-- Column: logo --> */}
        <Col className="col-1">
          <img src={img} class="home-logo" alt="ViewBovis_logo"></img>
        </Col>
        {/* <!-- Column: description --> */}
        <Col className="col-8">
          <div class="home-description-container">
            <p class="home-description fs-5">
              <span class="text-green fw-bold">ViewBovis</span> is a web
              application for exploring whole genome sequencing (WGS) data from{" "}
              <em>Mycobacterium bovis</em>. By linking genetic relatedness with
              geographical neighbourhood, you will be able to understand the
              transmission of this disease in both bovine and non-bovine
              animals.
              <b>
                {" "}
                Please note the scheduled downtime for ViewBovis is from
                10pm-8am daily
              </b>
              .
            </p>
          </div>
        </Col>
        {/* <!-- Column: data last updated --> */}
        <Col className="col-3">
          <Table>
            <Row className="update-banner">
              <p>Service Last Updated:</p>
              <p>Metadata</p>
              <p>WGS</p>
            </Row>
          </Table>
        </Col>
      </Row>
      {/* <!-- Box Quick-Links Content --> */}
      <Row className="row gx-6">
        {/* <!-- Cattle movement box --> */}
        <Col>
          <div className="home-box">
            <p class="fw-bold">Cattle Movement</p>
            <p>
              View cattle movements on an interactive map which helps with
              tracing cattle to control and eradicate bovine tuberculosis (bTB).
            </p>
            {/* <br> */}
            <div className="text-center">
              <Button
                as={NavLink}
                to="/cattlemovement"
                className="home-govuk-buttons"
                buttonColour="#00a33b"
              >
                Cattle Movement Map
              </Button>
            </div>
          </div>
        </Col>
        {/* <!-- Relatedness box --> */}
        <Col>
          <div className="home-box">
            <p class="fw-bold">Relatedness</p>
            <p>
              Visualise the relationships between samples with the help of WGS
              and location data for bovine and non-bovine samples.
            </p>
            <p class="text-center">
              View SNP distance visualisations:<br></br>
              <Button
                as={NavLink}
                to="/snpdistance/snpmap"
                className="home-govuk-buttons"
                buttonColour="#00a33b"
              >
                SNP Distance Map
              </Button>{" "}
              <Button
                as={NavLink}
                to="/snpdistance/snpmatrix"
                className="home-govuk-buttons"
                buttonColour="#00a33b"
              >
                SNP Matrix
              </Button>
            </p>
            <p class="text-center">
              View interactive phylogenetic tree:<br></br>
              <Button
                as={NavLink}
                to="/nextstrain"
                className="home-govuk-buttons"
                buttonColour="#00a33b"
              >
                Nextstrain
              </Button>
            </p>
          </div>
        </Col>
        {/* <!-- Help and support box --> */}
        <Col>
          <div className="home-box">
            <p class="fw-bold">Help & Support</p>
            <p>
              View a range of resources to familiarise yourself with the content
              of ViewBovis and access support.
            </p>
            <p class="text-center">
              <Button
                as={NavLink}
                to="/helpsupport"
                className="home-govuk-buttons"
                buttonColour="#00a33b"
              >
                About The Data & Data Dictionary
              </Button>
              <br></br>
              <Button
                as={NavLink}
                to="/helpsupport"
                className="home-govuk-buttons"
                buttonColour="#00a33b"
              >
                Training Resources
              </Button>
              <br></br>
              <Button
                as={NavLink}
                to="/helpsupport"
                className="home-govuk-buttons"
                buttonColour="#00a33b"
              >
                Missing Samples Report
              </Button>
            </p>
          </div>
        </Col>
      </Row>
      {/* <!-- Government Footer --> */}
      <Row className="footer">
        <div class="d-flex justify-content-between">
          <div class="text-start footer-text">
            Service developed and maintained by APHA Science
          </div>
          <div>
            <a
              class="text-end text-decoration-underline text-hyperlink px-3"
              href="https://teams.microsoft.com/l/team/19%3aWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2/conversations?groupId=9f4fc917-23c7-4ba4-b8ce-155c744d0152&tenantId=770a2450-0227-4c62-90c7-4e38537f1102"
              target="_blank"
            >
              Technical Support
            </a>
            {/* // <!-- Accessibility Statement  */}
            <a
              class="text-end text-decoration-underline text-hyperlink"
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

export default Home;
