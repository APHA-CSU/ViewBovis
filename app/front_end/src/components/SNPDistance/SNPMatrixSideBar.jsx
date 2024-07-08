import { useState } from "react";

const SNPMatrixSideBar = ({handlePlotMatrix, snpMatrixOptions, setSNPMatrixOptions}) => {
  return (
    <>
      <br />
      <div className={"govuk-heading-m"} id={"enter-sample-container"}>
        Enter Identifier or Submission
      </div>
      <div>
        <p>
          <input
            type={"text"}
            className="input__sampleID"
            placeholder="e.g. UK705113600438"
            name="Name"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-custom-class="input-tooltip"
            title="Identifier or Submission Number"
            value={snpMatrixOptions["sample"]}
            onChange={(e) => setSNPMatrixOptions({...snpMatrixOptions,"sample":(e.target.value).replace(/ /g,"")})}
          />
        </p>
      </div>
      <div id="snpmatrix-distance-container">
        <div
          className="govuk-heading-m"
          style={{ background: "#d1d1d1", padding: "10px", marginTop: "30px" }}
        >
          Select SNP Distance
        </div>
        <div>
          <p class="display-value-fixed" style={{ float: "left" }}>
            0
          </p>
          <p class="display-value-fixed" style={{ float: "right" }}>
            10
          </p>
          <input
            id="snpmatrix-range"
            type="range"
            class="snp-slider"
            min="0"
            max="10"
            step="1"
            value={snpMatrixOptions["snp_distance"]}
            onChange={(e) => setSNPMatrixOptions({...snpMatrixOptions,"snp_distance":e.target.value})}
          />
          <br />
          <span style={{ fontSize: "20px" }}>
            SNP Distance:{" "}
            <p class="display-value">
            {snpMatrixOptions["snp_distance"]}
            </p>
          </span>

          <br />
          <br />
          <button
            class="govuk-button"
            id="btn__plot-snpmatrix"
            aria-disabled="true"
            data-module="govuk-button"
            onClick={handlePlotMatrix}
          >
            Plot SNP Matrix
          </button>
          <div className="text-center">
            <output className="spinner-border text-secondary hidden">
              <span className="visually-hidden">Loading...</span>
            </output>
          </div>
          <div id="snpmatrix-warning-text"></div>
        </div>
      </div>
      <hr />
      <div
        id="snp-distribution-plot"
        style={{ height: "200px", width: "100%" }}
      ></div>
    </>
  );
};

export default SNPMatrixSideBar;