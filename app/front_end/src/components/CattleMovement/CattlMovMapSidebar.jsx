import { useState } from "react";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import LayersCheckbox from "../Layers/LayersCheckbox";
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
      <LayersCheckbox checkedLayers={checkedLayers} 
      countyAndHotspotLayers={countyAndHotspotLayers}
      handleCheckboxes={handleCheckboxes}
      setCountyAndHotspotLayers={setCountyAndHotspotLayers} />
    </div>
  );
};
export default CattlMovMapSidebar;
