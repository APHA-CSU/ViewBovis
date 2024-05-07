import { useState } from "react";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "@govuk-react/button";
import Heading from "@govuk-react/heading";
import Input from "@govuk-react/input";

const SNPMapSidebar = ({ setsearchSnp }) => {
  const [snpSearchInput, setsnpSearchInput] = useState("");

  const handleChange = (event) => {
    setsnpSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setsearchSnp(snpSearchInput);
    setsnpSearchInput("");
  };
  return (
    <div>
      <form className="sample-search" onSubmit={handleSubmit}>
        <div>
          <Heading id="enter-sample-container" size="MEDIUM">
            Enter Identifier or Submission
          </Heading>
          <Input value={snpSearchInput} onChange={handleChange} />
          <Heading id="enter-sample-container" size="MEDIUM" style={{ marginTop: "10px"}}>
          Select SNP Distance
          </Heading>
          <Button className="my-2" buttonColour="#00a33b">
          Plot Related Isolates
          </Button>
        </div>
      </form>
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
export default SNPMapSidebar;