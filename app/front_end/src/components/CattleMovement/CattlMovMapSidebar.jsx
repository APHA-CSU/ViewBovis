import { useState } from "react";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "@govuk-react/button";
import Heading from "@govuk-react/heading";
import Input from "@govuk-react/input";

const CattlMovMapSidebar = ({ setSearchSample, handleCheckboxes,checkedLayers }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.target.value.toUpperCase().replace(/ /g, ""));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchSample(searchInput);
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
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Add Another Movement</Accordion.Header>
            <Accordion.Body>TBC</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <Row className="my-5">
        <Heading size="SMALL">LAYERS</Heading>
        <Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header>
      <Form.Check
        className="checkbox"
        label="Risk Areas"
        checked={checkedLayers["showAllRA"]}
        onChange={(e) => handleCheckboxes(0,e.target.value)}
      />
    </Accordion.Header>
    <Accordion.Body>
      <div>
        <strong>England</strong>
        <Form.Check
          className="checkbox"
          label="HRA"
          checked={checkedLayers["High Risk Area"]}
          onChange={() => {handleCheckboxes(1)}}
        />
        <Form.Check
          className="checkbox"
          label="LRA"
          onChange={() => handleCheckboxes(2)}
          checked={checkedLayers["Low Risk Area"]}
        />
        <Form.Check
          className="checkbox"
          label="Edge"
          onChange={() => handleCheckboxes(3)}
          checked={checkedLayers["Edge Area"]}
        />
      </div>
      <div>
        <strong>Wales</strong>
        <Form.Check
          className="checkbox"
          label="HTBA"
          onChange={() => handleCheckboxes(4)}
          checked={checkedLayers["High TB Area"]}
        />
        <Form.Check
          className="checkbox"
          label="ITBA"
          onChange={() => handleCheckboxes(5)}
          checked={checkedLayers["Intermediate TB Area"]}
        />
        <Form.Check
          className="checkbox"
          label="LTBA"
          onChange={() => handleCheckboxes(6)}
          checked={checkedLayers["Low TB Area"]}
        />
      </div>
      <div>
        <strong>Scotland</strong>
        <Form.Check
          className="checkbox"
          label="TBFA"
          onChange={() => handleCheckboxes(7)}
          checked={checkedLayers["TB Free Area"]}
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
