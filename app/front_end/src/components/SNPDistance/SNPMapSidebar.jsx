import { useState } from "react";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "@govuk-react/button";
import Heading from "@govuk-react/heading";
import Input from "@govuk-react/input";

const SNPMapSidebar = ({ fetchSNPMapDataset,handleCheckboxes,checkedLayers, 
  countyAndHotspotLayers,setCountyAndHotspotLayers }) => {
  const [snpSearchInput, setSnpSearchInput] = useState("");
  const [snpDistance, setSnpDistance] = useState(1);

  const handleChange = (event) => {
    setSnpSearchInput(event.target.value);
  };

  const handleSlider = (event) => {
    setSnpDistance(event.target.value);
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
        <Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header>
      <Form.Check
        className="checkbox"
        label="Risk Areas"
        checked={checkedLayers["showAllRA"]}
        onChange={() => handleCheckboxes(0)}
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
  <Form.Check className="checkbox" label="Counties" 
    checked={countyAndHotspotLayers["countyLayers"]}
    onChange={() => {setCountyAndHotspotLayers({...countyAndHotspotLayers,
      "countyLayers" : !(countyAndHotspotLayers["countyLayers"])})}}/>
</Form>
<Form>
    <Form.Check className="checkbox" label="TB Hotspots"
      checked={countyAndHotspotLayers["hotspotLayers"]} 
      onChange={() => {setCountyAndHotspotLayers({...countyAndHotspotLayers,
        "hotspotLayers" : !(countyAndHotspotLayers["hotspotLayers"])})}}/>
</Form>
        </Form>
      </Row>
      <hr></hr>
    </div>
  );
};
export default SNPMapSidebar;