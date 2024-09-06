import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import nextstrainlogo from "../../imgs/nextstrain-logo.svg";
import { useState } from "react";
import NextstrainTable from "./NextstrainTable";
import NextstrainIframe from "./NextstrainIframe";
import { useSelector, useDispatch } from "react-redux";
import { setNextStrainWarnings } from "./../../features/counter/nextstrainSlice.js";
import "./Nextstrain.css";

const Nextstrain = () => {
  const nextStrainWarnings = useSelector(
    (state) => state.nextstrain.nextStrainWarnings
  );
  const showNextStrainPage = useSelector(
    (state) => state.security.showNextStrainPage
  );
  const dispatch = useDispatch();
  const [identifier, setIdentifier] = useState("");
  const [tableData, setTableData] = useState({});
  const [nextstrainURL, setNextstrainURL] = useState(null);

  const fetchNextstrainData = async () => {
    const response = await fetch(`/sample?sample_name=${identifier}`);

    if (!response.ok) {
      dispatch(
        setNextStrainWarnings(
          "Something went wrong: Please report the sample <a referrerpolicy='no-referrer' target='_blank' href='https://teams.microsoft.com/l/channel/19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2/General?groupId=9f4fc917-23c7-4ba4-b8ce-155c744d0152&tenantId='>here</a>"
        )
      );
      setTableData({});
    } else {
      const json = await response.json();
      if (json["warnings"]) {
        dispatch(setNextStrainWarnings(json["warning"]));
        setTableData({});
      } else {
        // Create an array containing table data
        let tableData = [
          {
            cph: `${json.cph}`,
            county: `${json.county}`,
            af: `${json.submission}`,
            eartag: `${json.identifier}`,
            clade: `${json.clade}`,
          },
        ];
        setTableData({ ...tableData });
        dispatch(setNextStrainWarnings(null));
      }
    }
  };

  return (
    <div className={showNextStrainPage ? "" : "hidden"}>
      {!nextstrainURL ? (
        <>
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
          {/* <!-- Nextstrain Logo and Description -->     */}
          <Row className="align-items-center">
            <Col className="col-3 text-center">
              <a href="https://nextstrain.org/" target="_blank">
                <img
                  src={nextstrainlogo}
                  className="nextstrainlogo"
                  alt="nextstrainlogo"
                ></img>
              </a>
            </Col>
            <Col className="col-9">
              <div className="home-description-container">
                <p className="home-description fs-5">
                  <span className="text-green fw-bold">Nextstrain</span> is a
                  tool used to visualise whole genome sequencing (WGS) data from{" "}
                  <em>Mycobacterium bovis</em>. You can view and explore both a
                  phylogenetic tree and a map to understand genetic relatedness
                  and locate samples geographically. This visualisation enables
                  you to view data on both bovine and non-bovine samples.
                </p>
              </div>
            </Col>
          </Row>
          {/* <!-- Contents--> */}
          <Row className="gx-6">
            {/* <!-- Search & Select Data Box --> */}
            <Col className="col-9">
              <div className="nextstrain-box">
                <Row>
                  {/* <!-- Search description col --> */}
                  <Col className="col-4">
                    <p className="fw-bold fs-4">Search & Select Data</p>
                    <p className="fs-6">
                      Use the search box to find your sample of interest. Click
                      a link in the table to view the phylogenetic tree in
                      Nextstrain.
                    </p>
                    <ul
                      className="fs-6"
                      style={{ height: "150px", overflowY: "scroll" }}
                    >
                      <li>
                        Clicking an Identifier (e.g. Ear Tag) or Submission
                        (e.g. AF number) highlights the sample of interest for
                        that clade.
                      </li>
                      <li>
                        Clicking on CPH or County highlights all samples in the
                        same CPH or County, respectively.
                      </li>
                      <li>
                        Clicking on the Clade or the link to the 'Commonly
                        Viewed Clades' shows the whole phylogenetic tree.
                      </li>
                    </ul>
                  </Col>
                  {/* <!-- Search below & Popular clades col--> */}
                  <Col className="col-8">
                    <Row
                      style={{
                        marginTop: "5px",
                        marginRight: "0",
                        backgroundColor: "white",
                      }}
                    >
                      <Col
                        className="col-8"
                        style={{ borderRight: "15px solid #f2f2f2" }}
                      >
                        <strong>Search Below:</strong>
                        <p>
                          For example: Identifier (Ear Tag:{" "}
                          <em>UK262728200982</em>) OR Submission (AF number:{" "}
                          <em>AF-21-08014-22</em>).
                        </p>
                        {/*<!-- Nextstrain Input Search Box -->*/}
                        <div className="govuk-input__wrapper">
                          <input
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="govuk-input fs-5"
                            id="nextstrain-input"
                            type="text"
                            placeholder="e.g. AF-10-125-125"
                          />
                          <div
                            className="govuk-input__suffix"
                            aria-hidden="true"
                            style={{ cursor: "pointer" }}
                            onClick={fetchNextstrainData}
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
                        <br></br>
                      </Col>
                      {/* <!-- Popular clades shortcut --> */}
                      <Col className="col-4">
                        <strong>Commonly Viewed Clades:</strong>
                        <br></br>
                        <p>
                          <span className="fw-bold fs-4 px-2">
                            <a
                              className="text-hyperlink"
                              id="clade-B111"
                              onClick={() => {
                                setNextstrainURL(`B1-11?p=grid&tl=Identifier`);
                              }}
                            >
                              B1-11
                            </a>
                          </span>
                          <span className="fw-bold fs-4 px-2">
                            <a
                              className="text-hyperlink"
                              id="clade-B613"
                              onClick={() => {
                                setNextstrainURL(`B6-13?p=grid&tl=Identifier`);
                              }}
                            >
                              B6-13
                            </a>
                          </span>
                          <br></br>
                          <span className="fw-bold fs-4 px-2">
                            <a
                              className="text-hyperlink"
                              id="clade-B671"
                              onClick={() => {
                                setNextstrainURL(`B6-71?p=grid&tl=Identifier`);
                              }}
                            >
                              B6-71
                            </a>
                          </span>
                          <span className="fw-bold fs-4 px-2">
                            <a
                              className="text-hyperlink"
                              id="clade-B691"
                              onClick={() => {
                                setNextstrainURL(`B6-91?p=grid&tl=Identifier`);
                              }}
                            >
                              B6-91
                            </a>
                          </span>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {nextStrainWarnings && (
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
                            <span
                              dangerouslySetInnerHTML={{
                                __html: nextStrainWarnings,
                              }}
                            ></span>
                          </span>
                        )}
                        {Object.keys(tableData).length > 0 && (
                          <NextstrainTable
                            data={tableData}
                            setNextstrainURL={setNextstrainURL}
                          />
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            {/* <!-- Training resources box --> */}
            <Col className="col-3">
              <div className="nextstrain-box">
                <p className="fw-bold fs-4">Training resources</p>
                <p className="fs-6">
                  The resources below have been developed to help you understand
                  how to use Nextstrain and how to interpret the phylogeny.
                  <br></br>
                </p>
                <p className="fs-6">
                  <a
                    className="text-hyperlink"
                    href="https://defra.sharepoint.com/:f:/s/MSTAPHAViewBovisUserGroup/EldmZORVs81MqDipytG9uRABDY-u2YY1u4zU4tSFfh_ZlA?e=zx05n2"
                    target="_blank"
                  >
                    How to use Nextstrain guide
                  </a>
                  <br></br>
                  <a
                    className="text-hyperlink"
                    href="https://defra.sharepoint.com/:f:/s/MSTAPHAViewBovisUserGroup/EuPuZgYqMcJFidxRIxWcDu8BgAcqyDQrshIMiRHrMfAcQg?e=bN4exu"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Video tutorials
                  </a>
                  <br></br>
                  <a
                    className="text-hyperlink"
                    href="https://defra.sharepoint.com/:f:/s/MSTAPHAViewBovisUserGroup/Et6ajyFNfIJAvUuWKFpdhJcBg2Tb_uR_JWDxp-pGVE67-w?e=P4dY03"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Self-assessment exercise
                  </a>
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
        </>
      ) : (
        <NextstrainIframe
          url={nextstrainURL}
          setNextstrainURL={setNextstrainURL}
        />
      )}
    </div>
  );
};

export default Nextstrain;
