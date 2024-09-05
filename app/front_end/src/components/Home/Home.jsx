import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../../imgs/VBIcon16_APHAGreen.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLatestDate } from "./../../features/counter/securitySlice.js";
import "./Home.css"

const Home = () => {
  const latestDate = useSelector((state) => state.security.latestDate);
  const showHomePage = useSelector((state) => state.security.showHomePage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (latestDate === "N/A")
      fetch(`/sample/lastupdate`)
        .then((res) => {
          if (!res.ok) {
            console.error(res);
            return null;
          } else {
            return res.json();
          }
        })
        .then((res) => {
          if (res) dispatch(setLatestDate(res["date"]));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, []);

  return (
    <div className={showHomePage ? "container-fluid content" : "hidden"}>
      <Container fluid data-testid="home-1">
        {/* <!-- Government BETA Banner --> */}
        <div className="row alpha-side-margin">
          <div className="govuk-phase-banner ">
            <div>
              <strong className="govuk-tag govuk-phase-banner__content__tag">
                BETA
              </strong>
              <span>
                This is a new service &ndash; your{" "}
                <a
                  className="text-hyperlink"
                  href="https://forms.office.com/e/RXTi1RzGnF"
                  target="_blank"
                  rel="noreferrer"
                >
                  feedback
                </a>{" "}
                will help us to improve it.
              </span>
            </div>
          </div>
        </div>
        {/* <!-- ViewBovis Logo and Description --> */}
        <Row className="align-items-center">
          {/* <!-- Column: logo --> */}
          <Col className="col-1">
            <img
              src={img}
              className="home-logo"
              alt="ViewBovis_logo"
              loading="lazy"
            ></img>
          </Col>
          {/* <!-- Column: description --> */}
          <Col className="col-8">
            <div className="home-description-container">
              <p className="home-description fs-5">
                <span className="text-green fw-bold">ViewBovis</span> is a web
                application for exploring whole genome sequencing (WGS) data
                from <em>Mycobacterium bovis</em>. By linking genetic
                relatedness with geographical neighbourhood, you will be able to
                understand the transmission of this disease in both bovine and
                non-bovine animals.{""}
                <b>
                  {" "}
                  Please note the scheduled downtime for ViewBovis is from
                  10pm-8am daily
                </b>
                {""}.
              </p>
            </div>
          </Col>
          {/* <!-- Column: data last updated --> */}
          <div className="col-3">
            <div className="govuk-notification-banner fs-6 home-banner-container">
              <div className="govuk-notification-banner__header">
                <h2
                  className="govuk-notification-banner__title fs-6"
                  id="govuk-notification-banner-title"
                >
                  Service Last Updated:{" "}
                  <span className="float-end">
                    <svg
                      id="service-help-icon"
                      type="button"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="24"
                      fill="white"
                      color="var(--apha-blue)"
                      className="bi bi-question-circle-fill"
                      viewBox="0 0 16 24"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z">
                        <title>
                          Indicating when the data serving ViewBovis was
                          refreshed. Reference this in your work for
                          traceability
                        </title>
                      </path>
                    </svg>
                  </span>
                </h2>
              </div>
              <div className="govuk-notification-banner__content home-banner-content">
                <p>
                  <span className="fw-bold float-start">Metadata</span>
                  <span className="float-end">{latestDate}</span>
                </p>
                <p style={{ paddingTop: "10px" }}>
                  <span className="fw-bold float-start">WGS</span>
                  <span className="float-end">{latestDate}</span>
                </p>
              </div>
            </div>
          </div>
        </Row>
        {/* <!-- Box Quick-Links Content --> */}
        <Row className="row gx-6">
          {/* <!-- Cattle movement box --> */}
          <Col>
            <div className="home-box">
              <p className="fw-bold">Cattle Movement</p>
              <p>
                View cattle movements on an interactive map which helps with
                tracing cattle to control and eradicate bovine tuberculosis
                (bTB).
              </p>
              {/* <br> */}
              <div className="text-center">
                <Link to="/cattlemovement">
                  <button className="btn govuk-button custom-govuk-button-home">
                    Cattle Movement Map
                  </button>
                </Link>
              </div>
            </div>
          </Col>
          {/* <!-- Relatedness box --> */}
          <Col>
            <div className="home-box">
              <p className="fw-bold">Relatedness</p>
              <p>
                Visualise the relationships between samples with the help of WGS
                and location data for bovine and non-bovine samples.
              </p>
              <p className="text-center">
                View SNP distance visualisations:<br></br>
                <Link to="/snpmap">
                  <button className="btn govuk-button custom-govuk-button-home">
                    SNP Map
                  </button>
                </Link>{" "}
              </p>
              <p className="text-center">
                View interactive phylogenetic tree:<br></br>
                <Link to="/nextstrain">
                  <button className="btn govuk-button custom-govuk-button-home">
                    NextStrain
                  </button>
                </Link>
              </p>
            </div>
          </Col>
          {/* <!-- Help and support box --> */}
          <Col>
            <div className="home-box">
              <p className="fw-bold">Help & Support</p>
              <p>
                View a range of resources to familiarise yourself with the
                content of ViewBovis and access support.
              </p>
              <p className="text-center">
                <Link to="/helpsupport">
                  <button className="btn govuk-button custom-govuk-button-home">
                    About The Data & Data Dictionary
                  </button>
                </Link>
                <br></br>
                <Link to="/helpsupport">
                  <button className="btn govuk-button custom-govuk-button-home">
                    Training Resources
                  </button>
                </Link>
                <br></br>
                <Link to="/helpsupport">
                  <button className="btn govuk-button custom-govuk-button-home">
                    Missing Samples Report
                  </button>
                </Link>
              </p>
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
                rel="noreferrer"
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
    </div>
  );
};

export default Home;
