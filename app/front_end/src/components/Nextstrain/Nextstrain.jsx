import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhaseBanner from "@govuk-react/phase-banner";
import Link from "@govuk-react/link";
import SearchBox from "@govuk-react/search-box";
import nextstrainlogo from "../../imgs/nextstrain-logo.svg";
import { useEffect, useRef, useState } from "react";

const Nextstrain = () => {
  const [identifier, setIdentifier] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tableData, setTableData] = useState({});
  const highlightClass = "cell-highlight";
  const onCellMouseOver = function (e, cell) {
    // Add the highlight class to the cell
    cell.getElement().classList.add(highlightClass);
  };

  // Define the cell mouse out event listener function
  const onCellMouseOut = function (e, cell) {
    // Remove the highlight class from the cell
    cell.getElement().classList.remove(highlightClass);
  };
  const fetchNextstrainData = async () => {
    const response = await fetch(`/sample?sample_name=${identifier}`);

    if (!response.ok) {
      setErrorMessage("Invalid submission: " + identifier);
    } else {
      const json = await response.json();

      // Remove spinner and activate search table when fetch is complete

      // If response contains a warning
      if (json["warnings"]) {
        setErrorMessage(`
            <p class="warning-text" style="white-space:pre" id="nextstrain-error-message">${json["warning"]}</p>
            `);
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
        // Create table
        let tableOptions = {
          data: tableData,
          selectable: false,
          columnDefaults: {
            resizable: false,
          },
          layout: "fitColumns",
          columns: [
            { title: "Identifier", field: "eartag" },
            { title: "Submission", field: "af" },
            { title: "Precise Location", field: "cph" },
            { title: "County", field: "county" },
            { title: "Clade", field: "clade" },
          ],
        };
        setTableData({ ...tableData });
      }
    }
  };

  return (
    <div className="container-fluid content">
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
                <span className="text-green fw-bold">Nextstrain</span> is a tool
                used to visualise whole genome sequencing (WGS) data from{" "}
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
                    Use the search box to find your sample of interest. Click a
                    link in the table to view the phylogenetic tree in
                    Nextstrain.
                  </p>
                  <ul
                    className="fs-6"
                    style={{ height: "150px", overflowY: "scroll" }}
                  >
                    <li>
                      Clicking an Identifier (e.g. Ear Tag) or Submission (e.g.
                      AF number) highlights the sample of interest for that
                      clade.
                    </li>
                    <li>
                      Clicking on CPH or County highlights all samples in the
                      same CPH or County, respectively.
                    </li>
                    <li>
                      Clicking on the Clade or the link to the 'Commonly Viewed
                      Clades' shows the whole phylogenetic tree.
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
                      <SearchBox>
                        <input
                          type="text"
                          placeholder="e.g. AF-10-125-125"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          className="input__sampleID"
                          style={{ marginRight: "10px" }}
                        />
                        <SearchBox.Button onClick={fetchNextstrainData} />
                      </SearchBox>
                      <br></br>
                    </Col>
                    {/* <!-- Popular clades shortcut --> */}
                    <Col className="col-4">
                      <strong>Commonly Viewed Clades:</strong>
                      <br></br>
                      <p>
                        <span className="fw-bold fs-4 px-2">
                          <a className="text-hyperlink" id="clade-B111">
                            B1-11
                          </a>
                        </span>
                        <span className="fw-bold fs-4 px-2">
                          <a className="text-hyperlink" id="clade-B613">
                            B6-13
                          </a>
                        </span>
                        <br></br>
                        <span className="fw-bold fs-4 px-2">
                          <a className="text-hyperlink" id="clade-B671">
                            B6-71
                          </a>
                        </span>
                        <span className="fw-bold fs-4 px-2">
                          <a className="text-hyperlink" id="clade-B691">
                            B6-91
                          </a>
                        </span>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {Object.keys(tableData).length > 0 && (
                        <NextstrainTable data={tableData} />
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
                >
                  Video tutorials
                </a>
                <br></br>
                <a
                  className="text-hyperlink"
                  href="https://defra.sharepoint.com/:f:/s/MSTAPHAViewBovisUserGroup/Et6ajyFNfIJAvUuWKFpdhJcBg2Tb_uR_JWDxp-pGVE67-w?e=P4dY03"
                  target="_blank"
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

const NextstrainTable = ({ data }) => {
  const tableOptions = {
    border: "1px solid #b1b4b6",
    padding: "10px",
    margin: "10px",
  };
  const nextStrainTableRef = useRef();
  const [tableWidth, setTableWidth] = useState();
  window.addEventListener("resize", () => {
    setTableWidth(nextStrainTableRef?.current?.offsetWidth);
  });

  useEffect(() => {
    setTableWidth(nextStrainTableRef?.current?.offsetWidth);
  }, [nextStrainTableRef]);

  useEffect(() => {
    if (tableWidth > 0) {
      let maxCellWidth = 110;
      let cellsPerTable = Math.floor(tableWidth / maxCellWidth);
      let numOfTables =
        5 % cellsPerTable == 0
          ? 5 / cellsPerTable
          : Math.floor(5 / cellsPerTable) + 1;
      let tableArr = ["eartag", "af", "cph", "county", "clade"];
      let headerArr = [
        "Identifier",
        "Submission",
        "Precise Location",
        "County",
        "Clade",
      ];
      let innerHTML = "";
      let currHeader = 0;
      let currCell = 0;
      for (let i = 0; i < numOfTables; i++) {
        innerHTML =
          innerHTML +
          `<table
          class="govuk-table align-middle"
          style="font-size:14px"
        >`;
        innerHTML =
          innerHTML +
          `<thead class="govuk-table__head"> <tr className="govuk-table__row">`;
        for (let j = 0; j < cellsPerTable && currHeader <= 4; j++) {
          innerHTML =
            innerHTML +
            `<th scope="col" class="govuk-table__header">
          ${headerArr[currHeader]}
        </th>`;
          currHeader++;
        }
        innerHTML = innerHTML + "</tr></thead>";
        innerHTML = innerHTML + `<tbody class="govuk-table__body"> <tr>`;
        for (let k = 0; k < cellsPerTable && currCell <= 4; k++) {
          innerHTML =
            innerHTML +
            `<td class="govuk-table__cell" style="background-color: var(--bs-body-bg)">
          ${data?.[0][tableArr[currCell]]}
        </td>`;
          currCell++;
        }
        innerHTML = innerHTML + "</tr> </tbody>";
        innerHTML = innerHTML + "</table>";
      }
      console.log(innerHTML, cellsPerTable);
      nextStrainTableRef.current.innerHTML = innerHTML;
    }
  }, [tableWidth]);

  return (
    <>
      {Object.keys(data).length > 0 && (
        <div ref={nextStrainTableRef} style={tableOptions}></div>
      )}
    </>
  );
};
export default Nextstrain;
