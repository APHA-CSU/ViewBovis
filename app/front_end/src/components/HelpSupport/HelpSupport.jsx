import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormImg from "../../imgs/feedback_form.svg";
import TeamsImg from "../../imgs/ms_teams.svg";
import { useSelector, useDispatch } from "react-redux";
import { setShowPage } from "../../features/counter/securitySlice";
import "./Help.css";

const HelpSupport = ({ Footer, Banner }) => {
  const showHelpSupportPage = useSelector(
    (state) => state.security.showHelpSupportPage
  );
  const dispatch = useDispatch();
  return (
    <div className={showHelpSupportPage ? "container-fluid" : "hidden"}>
      {/* <!-- Government BETA Banner --> */}
      <Banner />
      {/* <!-- Box Quick-Links Content --> */}
      <Row>
        {/* <!-- Support Documents box --> */}
        <Col>
          <div className="home-box help">
            <p className="fw-bold">Support Documents</p>
            <p>These support documents should be the first port of call:</p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:w:/r/teams/Team4008/Phase%202%20Documents/VB%20Training%20Content/Documents%20for%20React%20Version%20of%20ViewBovis/Official%20Training%20Documents/How-to%20and%20Glossary/ViewBovis%20How-to%20V5.docx?d=w95ed049e99ff43d79c6a3d6f807b6888&csf=1&web=1&e=4UZeGm"
                target="_blank"
                rel="noreferrer noopener"
              >
                How to use the app
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:w:/r/teams/Team4008/Phase%202%20Documents/VB%20Training%20Content/Documents%20for%20React%20Version%20of%20ViewBovis/Official%20Training%20Documents/How-to%20and%20Glossary/ViewBovis%20Glossary%20V3.docx?d=we30490d60dde423ba5db90eff23c035b&csf=1&web=1&e=x1Zkne"
                target="_blank"
                rel="noreferrer noopener"
              >
                Glossary
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:f:/r/teams/Team4008/Phase%202%20Documents/VB%20Training%20Content/Documents%20for%20React%20Version%20of%20ViewBovis/Official%20Training%20Documents/ViewBovis%20data%20background?csf=1&web=1&e=P1921B"
                target="_blank"
                rel="noreferrer noopener"
              >
                About the data
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:f:/r/teams/Team4008/Phase%202%20Documents/VB%20Training%20Content/Documents%20for%20React%20Version%20of%20ViewBovis/Official%20Training%20Documents/Training%20Exercises?csf=1&web=1&e=A46Vhz"
                target="_blank"
                rel="noreferrer noopener"
              >
                Training Exercises
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                onClick={() => {
                  dispatch(setShowPage("faq"));
                }}
              >
                Frequently Asked Questions
              </a>
            </p>
          </div>
        </Col>
        {/* <!-- Training Videos box --> */}
        <Col>
          <div className="home-box help">
            <p className="fw-bold">Training Videos</p>
            <p>These cover different aspects of learning and usability:</p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:v:/r/teams/Team4008/Phase%202%20Documents/VB%20Training%20Content/Documents%20for%20React%20Version%20of%20ViewBovis/Official%20Training%20Documents/Training%20Videos/ViewBovis_What%20is%20Phylogeny_v1.mp4?csf=1&web=1&e=y2cM4H"
                target="_blank"
                rel="noreferrer noopener"
              >
                Introduction to Phylogeny
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:v:/r/teams/Team4008/Phase%202%20Documents/VB%20Training%20Content/Documents%20for%20React%20Version%20of%20ViewBovis/Official%20Training%20Documents/Training%20Videos/ViewBovis_Homepage_v2.mp4?csf=1&web=1&e=8k6kB1"
                target="_blank"
                rel="noreferrer noopener"
              >
                ViewBovis Homepage Intro
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:v:/r/teams/Team4008/Phase%202%20Documents/VB%20Training%20Content/Documents%20for%20React%20Version%20of%20ViewBovis/Official%20Training%20Documents/Training%20Videos/ViewBovis_Nextstrain_v1.mp4?csf=1&web=1&e=fDqzoL"
                target="_blank"
                rel="noreferrer noopener"
              >
                Nextstrain usability and interpretation
              </a>
            </p>
            <p>
              <a
                className="text-hyperlink"
                href="https://defra.sharepoint.com/:v:/r/teams/Team4008/Phase%202%20Documents/VB%20Training%20Content/Documents%20for%20React%20Version%20of%20ViewBovis/Official%20Training%20Documents/Training%20Videos/ViewBovis_Maps_v2.mp4?csf=1&web=1&e=j0S4MY"
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
          <div className="home-box help">
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
                Lab Test Reports
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
            <h1 className="help-note">
              Note: We CANNOT provide support with these tools; contact the
              service provider.
            </h1>
          </div>
        </Col>
        {/* <!-- Contact Us box --> */}
        <Col>
          <div className="home-box help">
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
              <div className="col" id="contact-us">
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
              <div className="col" id="contact-us">
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
      <Footer />
    </div>
  );
};

export default HelpSupport;
