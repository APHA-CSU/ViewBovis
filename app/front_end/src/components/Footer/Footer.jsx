import Row from "react-bootstrap/Row";

const Footer = () => {
  return (
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
  );
};

export default Footer;
