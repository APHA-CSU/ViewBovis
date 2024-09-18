import LayersCheckbox from "../Layers/LayersCheckbox";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoadingScreen from "./../Utilities/LoadingScreen";

const SNPMapSidebar = ({
  handleCheckboxes,
  checkedLayers,
  countyAndHotspotLayers,
  setCountyAndHotspotLayers,
  fetchSNPMapDataset,
  spinner,
}) => {
  const snpWarnings = useSelector((state) => state.counter.snpmapWarnings);
  const showLayers = useSelector((state) => state.security.showLayers);
  const [sample, setSample] = useState("");
  const [distance, setDistance] = useState(1);
  const handleChange = (event) => {
    setSample(event.target.value);
  };

  const handleSlider = (event) => {
    setDistance(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSNPMapDataset(sample, distance);
  };

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
            id="input__sampleID_temp--1"
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
            id="snp-distance-value"
            type="range"
            onChange={handleSlider}
            step="1"
            max="10"
            min="0"
            value={distance}
            id="snp-distance-value"
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
          {spinner && (
            <div className="text-center" id="snpmap-spinner-container">
              <output className="spinner-border text-secondary">
                <span className="visually-hidden">Loading...</span>
              </output>
            </div>
          )}
          <br></br>
          {snpWarnings && (
            <span className="govuk-error-message">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                style={{ marginBottom: "4px" }}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>{" "}
              <span dangerouslySetInnerHTML={{ __html: snpWarnings }}></span>
            </span>
          )}
        </div>
      </form>
      {showLayers ? (
        <LayersCheckbox
          checkedLayers={checkedLayers}
          countyAndHotspotLayers={countyAndHotspotLayers}
          handleCheckboxes={handleCheckboxes}
          setCountyAndHotspotLayers={setCountyAndHotspotLayers}
        />
      ) : (
        <LoadingScreen message="Loading Layers" />
      )}
    </div>
  );
};
export default SNPMapSidebar;
