import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormImg from "../../imgs/feedback_form.svg";
import TeamsImg from "../../imgs/ms_teams.svg";

const HelpSupport = () => {
  return (
    <Container fluid>
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
      {/* <!-- Box Quick-Links Content --> */}
      <Row>
        {/* <!-- Support Documents box --> */}
        <Col>
          <div
            className="home-box"
            style={{ marginTop: "20px", height: "100%" }}
          >
            <p className="fw-bold">Support Documents</p>
            <p>These support documents should be the first port of call:</p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:f:/s/MSTAPHAViewBovisUserGroup/EldmZORVs81MqDipytG9uRABDY-u2YY1u4zU4tSFfh_ZlA?e=Baws0J"
                target="_blank"
                rel="noreferrer noopener"
              >
                How to use the app
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:f:/s/MSTAPHAViewBovisUserGroup/EldmZORVs81MqDipytG9uRABDY-u2YY1u4zU4tSFfh_ZlA?e=Baws0J"
                target="_blank"
                rel="noreferrer noopener"
              >
                Glossary
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/sites/MSTAPHAViewBovisUserGroup/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FMSTAPHAViewBovisUserGroup%2FShared%20Documents%2FGeneral%2FOFFICIAL%2DSENSITIVE%20ViewBovis%20Training%20Material%20%28BETA%29%2FBackground%20on%20the%20data%20in%20ViewBovis&p=true&ga=1"
                target="_blank"
                rel="noreferrer noopener"
              >
                About the data
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/sites/MSTAPHAViewBovisUserGroup/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FMSTAPHAViewBovisUserGroup%2FShared%20Documents%2FGeneral%2FOFFICIAL%2DSENSITIVE%20ViewBovis%20Training%20Material%20%28BETA%29%2FTraining%20Exercises&p=true&ga=1"
                target="_blank"
                rel="noreferrer noopener"
              >
                Training Exercises
              </a>
            </p>
          </div>
        </Col>
        {/* <!-- Training Videos box --> */}
        <Col>
          <div
            className="home-box"
            style={{ marginTop: "20px", height: "100%" }}
          >
            <p className="fw-bold">Training Videos</p>
            <p>These cover different aspects of learning and usability:</p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:v:/r/teams/Team3205/Shared%20Documents%20%20Field%20Epi%20KF/Training/ViewBovis%20Training/OFFICIAL-SENSITIVE%20ViewBovis%20Training%20Material%20(BETA)/Training%20Videos/ViewBovis_What%20is%20Phylogeny.mp4?csf=1&web=1&e=FlgXcP"
                target="_blank"
                rel="noreferrer noopener"
              >
                Introduction to Phylogeny
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:v:/r/teams/Team3205/Shared%20Documents%20%20Field%20Epi%20KF/Training/ViewBovis%20Training/OFFICIAL-SENSITIVE%20ViewBovis%20Training%20Material%20(BETA)/Training%20Videos/ViewBovis_Homepage_v1..mp4?csf=1&web=1&e=cvgnfB"
                target="_blank"
                rel="noreferrer noopener"
              >
                ViewBovis Homepage Intro
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:v:/r/teams/Team3205/Shared%20Documents%20%20Field%20Epi%20KF/Training/ViewBovis%20Training/OFFICIAL-SENSITIVE%20ViewBovis%20Training%20Material%20(BETA)/Training%20Videos/ViewBovis_Nextstrain_v1.mp4?csf=1&web=1&e=gqk03Q"
                target="_blank"
                rel="noreferrer noopener"
              >
                Nextstrain usability and interpretation
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:v:/r/teams/Team3205/Shared%20Documents%20%20Field%20Epi%20KF/Training/ViewBovis%20Training/OFFICIAL-SENSITIVE%20ViewBovis%20Training%20Material%20(BETA)/Training%20Videos/ViewBovis_Maps_v1.mp4?csf=1&web=1&e=6p3CJW"
                target="_blank"
                rel="noreferrer noopener"
              >
                Usability for SNP and Cattle Movement maps
              </a>
            </p>
          </div>
        </Col>
        {/* <!-- Other links and tools box --> */}
        <Col>
          <div
            className="home-box"
            style={{ marginTop: "20px", height: "100%" }}
          >
            <p className="fw-bold">Other links and tools</p>
            <p>Other associated tools which may be of use:</p>
            <p>
              <a
                className="text-hyperlink"
                href="http://services.demeter.zeus.gsi.gov.uk/iam/lo?TAM_OP=error&ERROR_CODE=0x38cf0427&URL=%2Fprweb%2FPRWebLDAP3%2Fapp%2FAnimalHealth%2FbPUd-1HMJMmK7qxOsowlXg*%2F%21STANDARD"
                target="_blank"
                rel="noreferrer noopener"
              >
                Sam
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://apha-016.cvlnt.vla.gov.uk/SPIDA/"
                target="_blank"
                rel="noreferrer noopener"
              >
                SPIDA
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://app.powerbi.com/groups/me/reports/b3cec343-cd33-477d-a68e-e1e46acac500/ReportSectionc95f11ff06a200a919a4?experience=power-bi"
                target="_blank"
                rel="noreferrer noopener"
              >
                CRYSTAL
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://ibtb.co.uk/"
                target="_blank"
                rel="noreferrer noopener"
              >
                ibTB
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="http://services.demeter.zeus.gsi.gov.uk/spiritah/Map.action?themeName"
                target="_blank"
                rel="noreferrer noopener"
              >
                CPH Viewer
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://magic.defra.gov.uk/"
                target="_blank"
                rel="noreferrer noopener"
              >
                MAGIC
              </a>
            </p>
            <h1 style={{ color: "black", fontSize: "11px" }}>
              Note: We CANNOT provide support with these tools; contact the
              service provider.
            </h1>
          </div>
        </Col>
        {/* <!-- Contact Us box --> */}
        <Col>
          <div
            className="home-box"
            style={{ marginTop: "20px", height: "100%" }}
          >
            <p className="fw-bold">Contact Us</p>
            <p>
              We would love to hear your feedback about the app, any tech issues
              and any questions you may have using the links below:
            </p>
            <div className="row">
              <div className="col-3">
                <a
                  href="https://forms.office.com/e/RXTi1RzGnF"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    src={FormImg}
                    width="40px"
                    className="d-inline-block align-text-top"
                    alt="feedback"
                  ></img>
                </a>
              </div>
              <div className="col" style={{ paddingTop: "15px" }}>
                <a
                  className="text-hyperlink"
                  href="https://forms.office.com/e/RXTi1RzGnF"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  User Survey
                </a>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-3">
                <a
                  href="https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fteam%2F19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2%2Fconversations%3FgroupId%3D9f4fc917-23c7-4ba4-b8ce-155c744d0152%26tenantId%3D770a2450-0227-4c62-90c7-4e38537f1102&type=team&deeplinkId=565be602-619e-4646-aff0-6246102b92fc&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    src={TeamsImg}
                    width="40px"
                    className="d-inline-block align-text-top"
                    alt="feedback"
                  ></img>
                </a>
              </div>
              <div className="col" style={{ paddingTop: "20px" }}>
                <a
                  className="text-hyperlink"
                  href="https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fteam%2F19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2%2Fconversations%3FgroupId%3D9f4fc917-23c7-4ba4-b8ce-155c744d0152%26tenantId%3D770a2450-0227-4c62-90c7-4e38537f1102&type=team&deeplinkId=565be602-619e-4646-aff0-6246102b92fc&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  ViewBovis User Group
                </a>
              </div>
            </div>
          </div>
        </Col>
        <br></br>
        <br></br>
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
              rel="noreferrer noopener"
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

export default HelpSupport;
