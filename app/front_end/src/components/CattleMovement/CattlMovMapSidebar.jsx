import { useState } from "react";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "@govuk-react/button";
import Heading from "@govuk-react/heading";
import Input from "@govuk-react/input";

const CattlMovMapSidebar = ({
  setSearchSample,
  handleCheckboxes,
  checkedLayers,
  setSearchSecondSample,
  countyAndHotspotLayers,
  setCountyAndHotspotLayers,
}) => {
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
          <Input
            value={searchInput}
            onChange={handleChange}
            placeholder="e.g. UK705113600438"
          />
          <Button className="my-2" buttonColour="#00a33b">
            Show Cattle Movement
          </Button>
        </div>
      </form>
      <Row className="my-4">
        <form onSubmit={handleSecondSubmit}>
          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Add Another Movement</Accordion.Header>
              <Accordion.Body>
                <Input
                  value={secondSearchInput}
                  onChange={handleSecondChange}
                  placeholder="e.g. UK705113600438"
                />
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
        <Accordion className="accordion-container">
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
                  onChange={() => {
                    handleCheckboxes(1);
                  }}
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
          <Form.Check
            className="checkbox"
            label="Counties"
            checked={countyAndHotspotLayers["countyLayers"]}
            onChange={() => {
              setCountyAndHotspotLayers({
                ...countyAndHotspotLayers,
                countyLayers: !countyAndHotspotLayers["countyLayers"],
              });
            }}
          />
        </Form>
        <Form>
          <Form.Check
            className="checkbox"
            label="TB Hotspots"
            checked={countyAndHotspotLayers["hotspotLayers"]}
            onChange={() => {
              setCountyAndHotspotLayers({
                ...countyAndHotspotLayers,
                hotspotLayers: !countyAndHotspotLayers["hotspotLayers"],
              });
            }}
          />
        </Form>
      </Row>
      <hr></hr>
    </div>
  );
};
export default CattlMovMapSidebar;
