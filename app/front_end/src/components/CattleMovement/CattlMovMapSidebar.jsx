import { useState } from "react";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "@govuk-react/button";
import Heading from "@govuk-react/heading";
import Input from "@govuk-react/input";

const CattlMovMapSidebar = ({ setSearchSample, setSearchSecondSample, handleRiskBoxClick, showRiskAreas }) => {
  const [searchInput, setSearchInput] = useState("");
  const [secondSearchInput, setSecondSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.target.value.toUpperCase().replace(/ /g, ""));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchSample(searchInput);
  };

  const handleSecondChange = (event) => {
    setSecondSearchInput(event.target.value.toUpperCase().replace(/ /g, ""));
  };

  const handleSecondSubmit = (event) => {
    event.preventDefault();
    setSearchSecondSample(secondSearchInput);
  };


  return (
    <div>
      <form className="sample-search" onSubmit={handleSubmit}>
        <div>
          <Heading id="enter-sample-container" size="MEDIUM">
            Enter Identifier or Submission
          </Heading>
          <Input value={searchInput} onChange={handleChange} placeholder="e.g. UK705113600438"/>
          <Button className="my-2" buttonColour="#00a33b">
            Show Cattle Movement
          </Button>
        </div>
      </form>
      <Row className="my-4">
        <form onSubmit={handleSecondSubmit} >
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Add Another Movement</Accordion.Header>
            <Accordion.Body>
              <Input value={secondSearchInput} onChange={handleSecondChange} placeholder="e.g. UK705113600438"/>
              <Button className="my-2" buttonColour="#00a33b">
            Show Second Movement
          </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </form>
      </Row>
      <Row className="my-5">
        <Heading size="SMALL">LAYERS</Heading>
        <Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header>
      <Form.Check
        className="checkbox"
        label="Risk Areas"
        checked={showRiskAreas}
        onClick={handleRiskBoxClick}
      />
    </Accordion.Header>
    <Accordion.Body>
      <div>
        <strong>England</strong>
        <Form.Check
          className="checkbox"
          label="HRA"
        />
        <Form.Check
          className="checkbox"
          label="LRA"
          // onChange={}
        />
        <Form.Check
          className="checkbox"
          label="Edge"
          // onChange={}
        />
      </div>
      <div>
        <strong>Wales</strong>
        <Form.Check
          className="checkbox"
          label="HTBA"
          // onChange={}
        />
        <Form.Check
          className="checkbox"
          label="ITBA"
          // onChange={}
        />
        <Form.Check
          className="checkbox"
          label="LTBA"
          // onChange={}
        />
      </div>
      <div>
        <strong>Scotland</strong>
        <Form.Check
          className="checkbox"
          label="TBFA"
          // onChange={}
        />
      </div>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

        <Form>
          <Form.Check className="checkbox" label="Counties" />
        </Form>
        <Form>
          <Form.Check className="checkbox" label="TB Hotspots" />
        </Form>
        <Form>
          <Form.Check className="checkbox" label="Movement Lines" />
        </Form>
      </Row>
      <hr></hr>
    </div>
  );
};
export default CattlMovMapSidebar;
