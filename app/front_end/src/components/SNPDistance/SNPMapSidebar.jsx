import LayersCheckbox from "../Layers/LayersCheckbox";
import { useSelector, useDispatch } from "react-redux";
import {
  setSNPsample,
  setSNPdistance
} from "./../../features/counter/counterSlice";
import { useEffect, useState } from "react";

const SNPMapSidebar = ({
  handleCheckboxes,
  checkedLayers,
  countyAndHotspotLayers,
  setCountyAndHotspotLayers,
  fetchSNPMapDataset
}) => {
  const snpSearchInput = useSelector((state) => state.counter.snpSearchInput);
  const snpDistance = useSelector((state) => state.counter.snpDistance);
  const [sample, setSample] = useState();
  const [distance, setDistance] = useState();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setSample(event.target.value);
  };

  const handleSlider = (event) => {
    setDistance(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSNPsample(sample));
    dispatch(setSNPdistance(distance));
    fetchSNPMapDataset(sample,distance)
  };

  useEffect(() => {
    setSample(snpSearchInput);
    setDistance(snpDistance);
  }, []);

  return (
    <div>
      <form className="sample-search" onSubmit={handleSubmit}>
        <div>
          <div className="govuk-heading-m" id="enter-sample-container">
            Enter Identifier or Submission
          </div>
          <input
            type="text"
            className="input__sampleID"
            placeholder="e.g. UK705113600438"
            name="Name"
            title="Identifier or Submission Number"
            value={sample}
            onChange={handleChange}
          />
          <br></br>
          <br></br>
          <div id="enter-sample-container" className="govuk-heading-m">
            Select SNP Distance
          </div>
          <div style={{ marginTop: "20px" }}>
            <p className="display-value-fixed" style={{ float: "left" }}>
              0
            </p>
            <p className="display-value-fixed" style={{ float: "right" }}>
              10
            </p>
          </div>
          <input
            className="snp-slider"
            type="range"
            onChange={handleSlider}
            step="1"
            defaultValue="1"
            max="10"
            min="0"
          />
          <br></br>
          <span style={{ fontSize: "20px" }}>
            {" "}
            <b>SNP Distance:</b> {distance}{" "}
          </span>
          <br></br>
          <br></br>
          <button
            className="govuk-button"
            id="btn__plot-related-isolates"
            aria-disabled="true"
          >
            Plot Related Isolates
          </button>
        </div>
      </form>
      <LayersCheckbox
        checkedLayers={checkedLayers}
        countyAndHotspotLayers={countyAndHotspotLayers}
        handleCheckboxes={handleCheckboxes}
        setCountyAndHotspotLayers={setCountyAndHotspotLayers}
      />
    </div>
  );
};
export default SNPMapSidebar;
