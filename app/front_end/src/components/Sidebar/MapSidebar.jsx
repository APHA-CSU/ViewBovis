import { useState } from "react";
import { Row, Accordion, Form } from "react-bootstrap";
import { Button, Heading, Input } from "govuk-react";

const MapSidebar = ({ setSearchSample }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchSample(searchInput);
    setSearchInput("");
  };
  return (
    <div>
      <form className="sample-search" onSubmit={handleSubmit}>
        <div>
          <Heading id="enter-sample-container" size="MEDIUM">
            Enter Identifier or Submission
          </Heading>
          <Input value={searchInput} onChange={handleChange} />
          <Button className="my-2" buttonColour="#00a33b">
            Show Cattle Movement
          </Button>
        </div>
      </form>
      <Row className="my-4">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Add Another Movement</Accordion.Header>
            <Accordion.Body>TBC</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row> 
      <Row className="my-5">
        <Heading size="SMALL">LAYERS</Heading>
        <Form>
          <Form.Check className="checkbox" label="Risk Areas" />
          <Form.Check className="checkbox" label="Counties" />
          <Form.Check className="checkbox" label="TB Hotspots" />
          <Form.Check className="checkbox" label="Movement Lines" />
        </Form>
      </Row>
      <hr></hr>
    </div>
  );
};
export default MapSidebar;