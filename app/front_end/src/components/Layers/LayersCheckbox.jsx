import "bootstrap/js/dist/collapse";
const LayersCheckbox = ({
  checkedLayers,
  handleCheckboxes,
  setCountyAndHotspotLayers,
  countyAndHotspotLayers,
}) => {
  return (
    <>
      {" "}
      <hr></hr>
      <div className="row">
        <p className="fs-5 fw-bold">
          <span>
            LAYERS
            <svg
              id="layers-help-icon2"
              type="button"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="24"
              fill="var(--apha-blue)"
              className="bi bi-question-circle-fill"
              viewBox="0 0 16 24"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z">
                <title>Customise the map according to these options</title>
              </path>
            </svg>
          </span>
        </p>
        <div
          className="govuk-checkboxes govuk-checkboxes--small"
          data-module="govuk-checkboxes"
        >
          <div className="govuk-checkboxes__item" style={{ width: "100%" }}>
            <input
              className="govuk-checkboxes__input"
              id="riskAreasBox2"
              type="checkbox"
              checked={checkedLayers["showAllRA"]}
              onChange={() => handleCheckboxes(0)}
            />
            <label
              className="govuk-checkboxes__label 
            accordion accordion-item"
              id="accordion__riskAreas2"
              htmlFor="riskAreasBox2"
              style={{ width: "100%", padding: 0, border: "none" }}
            >
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#body__riskAreas2"
                aria-expanded="false"
                aria-controls="body__riskAreas2"
                style={{ padding: "10px" }}
              >
                <span className="govuk-label" style={{ margin: "0" }}>
                  Risk Areas
                </span>
              </button>
              <div
                id="body__riskAreas2"
                className="accordion-collapse collapse"
                data-bs-parent="#accordion__riskAreas2"
              >
                <div className="accordion-body" style={{ paddingTop: "0" }}>
                  <div
                    className="govuk-checkboxes__item"
                    style={{ marginLeft: "-35px" }}
                  >
                    <strong>England</strong>
                  </div>
                  <div className="govuk-checkboxes__item">
                    <input
                      className="govuk-checkboxes__input"
                      id="checkbox__HRA2"
                      type="checkbox"
                      checked={checkedLayers["High Risk Area"]}
                      onChange={() => {
                        handleCheckboxes(1);
                      }}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="checkbox__HRA2"
                    >
                      HRA
                    </label>
                  </div>
                  <div className="govuk-checkboxes__item">
                    <input
                      className="govuk-checkboxes__input"
                      id="checkbox__LRA2"
                      type="checkbox"
                      onChange={() => handleCheckboxes(2)}
                      checked={checkedLayers["Low Risk Area"]}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="checkbox__LRA2"
                    >
                      LRA
                    </label>
                  </div>
                  <div className="govuk-checkboxes__item">
                    <input
                      className="govuk-checkboxes__input"
                      id="checkbox__Edge2"
                      type="checkbox"
                      onChange={() => handleCheckboxes(3)}
                      checked={checkedLayers["Edge Area"]}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="checkbox__Edge2"
                    >
                      Edge
                    </label>
                  </div>
                  <div
                    className="govuk-checkboxes__item"
                    style={{ marginLeft: "-35px" }}
                  >
                    <strong>Wales</strong>
                  </div>
                  <div className="govuk-checkboxes__item">
                    <input
                      className="govuk-checkboxes__input"
                      id="checkbox__HTBA2"
                      type="checkbox"
                      onChange={() => handleCheckboxes(4)}
                      checked={checkedLayers["High TB Area"]}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="checkbox__HTBA2"
                    >
                      HTBA
                    </label>
                  </div>
                  <div className="govuk-checkboxes__item">
                    <input
                      className="govuk-checkboxes__input"
                      id="checkbox__ITBA2"
                      type="checkbox"
                      onChange={() => handleCheckboxes(5)}
                      checked={checkedLayers["Intermediate TB Area"]}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="checkbox__ITBA2"
                    >
                      ITBA
                    </label>
                  </div>
                  <div className="govuk-checkboxes__item">
                    <input
                      className="govuk-checkboxes__input"
                      id="checkbox__LTBA2"
                      type="checkbox"
                      onChange={() => handleCheckboxes(6)}
                      checked={checkedLayers["Low TB Area"]}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="checkbox__LTBA2"
                    >
                      LTBA
                    </label>
                  </div>
                  <div
                    className="govuk-checkboxes__item"
                    style={{ marginLeft: "-35px" }}
                  >
                    <strong>Scotland</strong>
                  </div>
                  <div className="govuk-checkboxes__item">
                    <input
                      className="govuk-checkboxes__input"
                      id="checkbox__TBFA2"
                      type="checkbox"
                      onChange={() => handleCheckboxes(7)}
                      checked={checkedLayers["TB Free Area"]}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="checkbox__TBFA2"
                    >
                      TBFA
                    </label>
                  </div>
                </div>
              </div>
            </label>
          </div>

          <div className="govuk-checkboxes__item">
            <input
              className="govuk-checkboxes__input"
              id="countyBox2"
              type="checkbox"
              checked={countyAndHotspotLayers["countyLayers"]}
              onChange={() => {
                setCountyAndHotspotLayers({
                  ...countyAndHotspotLayers,
                  countyLayers: !countyAndHotspotLayers["countyLayers"],
                });
              }}
            />
            <label
              className="govuk-label govuk-checkboxes__label"
              htmlFor="countyBox2"
            >
              Counties
            </label>
          </div>

          <div
            className="govuk-checkboxes__item"
            style={{ marginBottom: "20px" }}
          >
            <input
              className="govuk-checkboxes__input"
              id="hotspotBox2"
              type="checkbox"
              checked={countyAndHotspotLayers["hotspotLayers"]}
              onChange={() => {
                setCountyAndHotspotLayers({
                  ...countyAndHotspotLayers,
                  hotspotLayers: !countyAndHotspotLayers["hotspotLayers"],
                });
              }}
            />
            <label
              className="govuk-label govuk-checkboxes__label"
              htmlFor="hotspotBox2"
            >
              TB Hotspots
            </label>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default LayersCheckbox;
