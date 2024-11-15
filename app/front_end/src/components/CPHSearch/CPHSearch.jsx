import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cphsearch_logo from "../../imgs/cphsearch_logo.svg";
import AsyncSelect from "react-select/async";
import "./CPHSearch.css";
import { useState } from "react";
import CPHTableComp from "./CPHTableComp";
import { setShowPage } from "../../features/counter/securitySlice";
import {
  setSNPSample,
  setSNPDistance,
  fetchSNPMapDataset,
} from "../../features/counter/counterSlice";
import {
  fetchCattleMovementDataset,
  setFirstSearchSample,
} from "../../features/counter/movementSlice";
import {
  fetchNextstrainData,
  setNextstrainIdentifier,
  setNextstrainURL,
} from "../../features/counter/nextstrainSlice";

const CPHSearch = ({}) => {
  const showCPHSearchPage = useSelector(
    (state) => state.security.showCPHSearchPage
  );
  const dispatch = useDispatch();
  const [cphMetadata, setCPHMetadata] = useState([]);
  const [cphWarnings, setCPHWarnings] = useState(null);
  const [cphValue, setCPHValue] = useState();
  const loadOptions = async (inputString) => {
    if (inputString.replace(/ /g, "").toUpperCase() == "") return [];
    return fetch(
      "/sample/cphsearch?search_string=" +
        inputString.replace(/ /g, "").toUpperCase()
    )
      .then((response) => response.json())
      .then((json) => {
        return json.map((cell) => {
          cell["value"] = cell["CPH"];
          cell["label"] = cell["CPH"];
          return cell;
        });
      })
      .catch((error) => {
        return [];
      });
  };

  const fetchCPHSamples = async () => {
    if (cphValue?.CPH.length > 0) {
      fetch("/sample/cphsamples?cph=" + cphValue["CPH"])
        .then((response) => response.json())
        .then((metadata) => {
          let data = [...metadata];
          data.map((sample, index) => {
            sample["tools"] = {
              snpmap: () => {
                dispatch(setSNPSample(sample["Submission"]));
                dispatch(setSNPDistance(1));
                dispatch(
                  fetchSNPMapDataset({
                    snpSample: sample["Submission"],
                    snpDistance: 1,
                  })
                );
                dispatch(setShowPage("snpmap"));
              },
              movement: () => {
                dispatch(setFirstSearchSample(sample["Submission"]));
                dispatch(
                  fetchCattleMovementDataset({
                    searchInput: sample["Submission"],
                  })
                );
                dispatch(setShowPage("cattlemovement"));
              },
              nextstrain: async () => {
                dispatch(setNextstrainIdentifier(sample["Submission"]));
                dispatch(
                  fetchNextstrainData({ identifier: sample["Submission"] })
                );
                dispatch(
                  setNextstrainURL(
                    `${sample["Clade"]}?f_Submission=${sample[
                      "Submission"
                    ].replace(/ /g, "")}&p=grid`
                  )
                );
                dispatch(setShowPage("nextstrain"));
              },
            };
            return sample;
          });
          setCPHMetadata(data);
        })
        .catch((error) => {});
    } else {
      setCPHMetadata([]);
    }
  };
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
              <span className="text-green fw-bold">CPH Search</span> allows you to search by CPH and view samples with available WGS data. You will be able to view the metadata that relates to a
              sample and the location of that CPH. You can additionally launch
              the data visualisations for a particular sample from options
              available in the search table.
            </p>
          </div>
        </Col>
      </Row>
      <br />
      <div className="govuk-input__wrapper">
        <AsyncSelect
          type="text"
          placeholder="Search by CPH"
          loadOptions={loadOptions}
          value={cphValue}
          onChange={(cph) => {
            setCPHValue(cph);
          }}
          isClearable={true}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "60vw",
              color: "black",
              fontSize: "14px",
              height: "35px",
              boxShadow: "0 2px 0 #002d18",
              borderRadius: "0px",
              maxWidth: "500px",
            }),
          }}
        />
        <div
          className="govuk-button"
          aria-hidden="true"
          style={{ cursor: "pointer" }}
          onClick={() => fetchCPHSamples()}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="container-fluid">
        <CPHTableComp samples={cphMetadata} />
      </div>
    </div>
  );
};

export default CPHSearch;
