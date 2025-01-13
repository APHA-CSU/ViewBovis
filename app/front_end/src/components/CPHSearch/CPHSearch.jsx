import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cphsearch_logo from "../../imgs/cphsearch_logo.svg";
import "./CPHSearch.css";
import CPHTableComp from "./CPHTableComp";
import CPHAsyncSelect from "./CPHAsynSelect";

const CPHSearch = ({}) => {
  const showCPHSearchPage = useSelector(
    (state) => state.security.showCPHSearchPage
  );
  const cphWarnings = useSelector((state) => state.cphsearch.cphWarnings);

  return (
    <div className={showCPHSearchPage ? "container-fluid" : "hidden"}>
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
      <br />
      {/* <!-- Nextstrain Logo and Description -->     */}
      <Row className="align-items-center">
        <Col className="col-3 text-center">
          <img
            src={cphsearch_logo}
            className="cphsearch-logo"
            alt="cphsearch_logo"
          ></img>
        </Col>
        <Col className="col-9">
          <div className="home-description-container">
            <p className="home-description fs-5">
              <span className="text-green fw-bold">CPH Search</span> allows you
              to search by CPH and view samples with available WGS data. You
              will be able to view the metadata that relates to a sample and the
              location of that CPH. You can additionally launch the data
              visualisations for a particular sample from options available in
              the search table.
            </p>
          </div>
        </Col>
      </Row>
      <br />
      <CPHAsyncSelect />
      {cphWarnings && (
        <span className="govuk-error-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            style={{ marginBottom: "4px" }}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>{" "}
          <span dangerouslySetInnerHTML={{ __html: cphWarnings }}></span>
        </span>
      )}
      <div className="container-fluid">
        <CPHTableComp />
      </div>
    </div>
  );
};

export default CPHSearch;
