import { useState } from "react";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "@govuk-react/button";
import Heading from "@govuk-react/heading";
import Input from "@govuk-react/input";
import "./SNPMap.css"

const SNPMapSidebar = ({ fetchSNPMapDataset }) => {
  const [snpSearchInput, setsnpSearchInput] = useState("");
  const [snpDistance, setsnpDistance] = useState(1);

  const handleChange = (event) => {
    setsnpSearchInput(event.target.value);
  };

  const handleSlider = (event) => {
    setsnpDistance(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSNPMapDataset(snpSearchInput,snpDistance);
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
          <div style={{marginTop:"20px"}}>
          <p className="display-value-fixed" style={{float: "left"}}>0</p>
          <p className="display-value-fixed" style={{float: "right"}}>10</p>
          </div>
          <input className="snp-slider" type="range" onChange={handleSlider} step="1" 
          defaultValue="1" max="10" min="0"/>
          <br/>
          SNP Distance: {snpDistance}
          <br/>
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