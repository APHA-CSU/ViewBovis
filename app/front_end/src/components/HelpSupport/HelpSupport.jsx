import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import PhaseBanner from "@govuk-react/phase-banner";
import Link from "@govuk-react/link";
import Col from "react-bootstrap/Col";
import FormImg from "../../imgs/feedback_form.svg";
import TeamsImg from "../../imgs/ms_teams.svg";

const HelpSupport = () => {
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
      {/* <!-- Box Quick-Links Content --> */}
      <Row>
        {/* <!-- Support Documents box --> */}
        <Col>
          <div class="home-box"  style={{ marginTop: "20px", height: "405px" }}>
            <p class="fw-bold">Support Documents</p>
            <p>These support documents should be the first port of call:</p>
            <p>
              <a
                class="text-hyperlink"
                href="https://defra.sharepoint.com/:f:/s/MSTAPHAViewBovisUserGroup/EldmZORVs81MqDipytG9uRABDY-u2YY1u4zU4tSFfh_ZlA?e=Baws0J"
                target="_blank"
              >
                How to use the app
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://defra.sharepoint.com/:f:/s/MSTAPHAViewBovisUserGroup/EldmZORVs81MqDipytG9uRABDY-u2YY1u4zU4tSFfh_ZlA?e=Baws0J"
                target="_blank"
              >
                Glossary
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://defra.sharepoint.com/sites/MSTAPHAViewBovisUserGroup/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FMSTAPHAViewBovisUserGroup%2FShared%20Documents%2FGeneral%2FOFFICIAL%2DSENSITIVE%20ViewBovis%20Training%20Material%20%28BETA%29%2FBackground%20on%20the%20data%20in%20ViewBovis&p=true&ga=1"
                target="_blank"
              >
                About the data
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://defra.sharepoint.com/sites/MSTAPHAViewBovisUserGroup/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FMSTAPHAViewBovisUserGroup%2FShared%20Documents%2FGeneral%2FOFFICIAL%2DSENSITIVE%20ViewBovis%20Training%20Material%20%28BETA%29%2FTraining%20Exercises&p=true&ga=1"
                target="_blank"
              >
                Training Exercises
              </a>
            </p>
          </div>
        </Col>
        {/* <!-- Training Videos box --> */}
        <Col>
          <div class="home-box"  style={{ marginTop: "20px", height: "405px" }}>
            <p class="fw-bold">Training Videos</p>
            <p>These cover different aspects of learning and usability:</p>
            <p>
              <a
                class="text-hyperlink"
                href="https://defra.sharepoint.com/sites/MSTAPHAViewBovisUserGroup/_layouts/15/stream.aspx?id=%2Fsites%2FMSTAPHAViewBovisUserGroup%2FShared%20Documents%2FGeneral%2FOFFICIAL%2DSENSITIVE%20ViewBovis%20Training%20Material%20%28BETA%29%2FTraining%20Videos%2FViewBovis%5FWhat%20is%20Phylogeny%2Emp4&ga=1"
                target="_blank"
              >
                Introduction to Phylogeny
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://defra.sharepoint.com/sites/MSTAPHAViewBovisUserGroup/_layouts/15/stream.aspx?id=%2Fsites%2FMSTAPHAViewBovisUserGroup%2FShared%20Documents%2FGeneral%2FOFFICIAL%2DSENSITIVE%20ViewBovis%20Training%20Material%20%28BETA%29%2FTraining%20Videos%2FViewBovis%5FHomepage%5Fv1%2E%2Emp4&ga=1"
                target="_blank"
              >
                ViewBovis Homepage Intro
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://defra.sharepoint.com/sites/MSTAPHAViewBovisUserGroup/_layouts/15/stream.aspx?id=%2Fsites%2FMSTAPHAViewBovisUserGroup%2FShared%20Documents%2FGeneral%2FOFFICIAL%2DSENSITIVE%20ViewBovis%20Training%20Material%20%28BETA%29%2FTraining%20Videos%2FViewBovis%5FNextstrain%5Fv1%2Emp4&ga=1"
                target="_blank"
              >
                Nextstrain usability and interpretation
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://defra.sharepoint.com/sites/MSTAPHAViewBovisUserGroup/_layouts/15/stream.aspx?id=%2Fsites%2FMSTAPHAViewBovisUserGroup%2FShared%20Documents%2FGeneral%2FOFFICIAL%2DSENSITIVE%20ViewBovis%20Training%20Material%20%28BETA%29%2FTraining%20Videos%2FViewBovis%5FSNPMatrix%5Fv1%2Emp4&ga=1"
                target="_blank"
              >
                SNP Matrix usability and interpretation
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://defra.sharepoint.com/sites/MSTAPHAViewBovisUserGroup/_layouts/15/stream.aspx?id=%2Fsites%2FMSTAPHAViewBovisUserGroup%2FShared%20Documents%2FGeneral%2FOFFICIAL%2DSENSITIVE%20ViewBovis%20Training%20Material%20%28BETA%29%2FTraining%20Videos%2FViewBovis%5FMaps%5Fv1%2Emp4&ga=1"
                target="_blank"
              >
                Usability for SNP and Cattle Movement maps
              </a>
            </p>
          </div>
        </Col>
        {/* <!-- Other links and tools box --> */}
        <Col>
          <div class="home-box"  style={{ marginTop: "20px", height: "405px" }}>
            <p class="fw-bold">Other links and tools</p>
            <p>Other associated tools which may be of use:</p>
            <p>
              <a
                class="text-hyperlink"
                href="http://services.demeter.zeus.gsi.gov.uk/iam/lo?TAM_OP=error&ERROR_CODE=0x38cf0427&URL=%2Fprweb%2FPRWebLDAP3%2Fapp%2FAnimalHealth%2FbPUd-1HMJMmK7qxOsowlXg*%2F%21STANDARD"
                target="_blank"
              >
                Sam
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://apha-016.cvlnt.vla.gov.uk/SPIDA/"
                target="_blank"
              >
                SPIDA
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="http://reports.cvlnt.vla.gov.uk/ReportGroup.aspx?ReportGroupId=da063b9e-fc87-43ff-9fc8-a88100e89f29"
                target="_blank"
              >
                CRYSTAL
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://ibtb.co.uk/"
                target="_blank"
              >
                ibTB
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="http://services.demeter.zeus.gsi.gov.uk/spiritah/Map.action?themeName"
                target="_blank"
              >
                CPH Viewer
              </a>
            </p>
            <p>
              <a
                class="text-hyperlink"
                href="https://magic.defra.gov.uk/"
                target="_blank"
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
          <div class="home-box"  style={{ marginTop: "20px", height: "405px" }}>
            <p class="fw-bold">Contact Us</p>
            <p>
              We would love to hear your feedback about the app, any tech issues
              and any questions you may have using the links below:
            </p>
            <div class="row">
              <div class="col-3">
                <a href="https://forms.office.com/e/RXTi1RzGnF" target="_blank">
                  <img
                    src={FormImg}
                    width="40px"
                    class="d-inline-block align-text-top"
                    alt="feedback"
                  ></img>
                </a>
              </div>
              <div class="col" style={{ paddingTop: "15px" }}>
                <a
                  class="text-hyperlink"
                  href="https://forms.office.com/e/RXTi1RzGnF"
                  target="_blank"
                >
                  User Survey
                </a>
              </div>
            </div>
            <br></br>
            <div class="row">
              <div class="col-3">
                <a
                  href="https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fteam%2F19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2%2Fconversations%3FgroupId%3D9f4fc917-23c7-4ba4-b8ce-155c744d0152%26tenantId%3D770a2450-0227-4c62-90c7-4e38537f1102&type=team&deeplinkId=565be602-619e-4646-aff0-6246102b92fc&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true"
                  target="_blank"
                >
                  <img
                    src={TeamsImg}
                    width="40px"
                    class="d-inline-block align-text-top"
                    alt="feedback"
                  ></img>
                </a>
              </div>
              <div class="col" style={{ paddingTop: "20px" }}>
                <a
                  class="text-hyperlink"
                  href="https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fteam%2F19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2%2Fconversations%3FgroupId%3D9f4fc917-23c7-4ba4-b8ce-155c744d0152%26tenantId%3D770a2450-0227-4c62-90c7-4e38537f1102&type=team&deeplinkId=565be602-619e-4646-aff0-6246102b92fc&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true"
                  target="_blank"
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

export default HelpSupport;
