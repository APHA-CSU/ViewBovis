import { useState, useEffect } from "react";
import LayersCheckbox from "../Layers/LayersCheckbox";
import {
  setCattleSearchInput,
  setCattleMovementDataset,
  setCattleSecondInput,
  setSecondMovementDataset,
  setMovementWarnings,
  setSecondMovementWarnings,
} from "./../../features/counter/movementSlice";
import { useSelector, useDispatch } from "react-redux";

const CattlMovMapSidebar = ({
  handleCheckboxes,
  checkedLayers,
  countyAndHotspotLayers,
  setCountyAndHotspotLayers,
}) => {
  const cattleSearchInput = useSelector(
    (state) => state.movement.cattleSearchInput
  );
  const movementWarnings = useSelector(
    (state) => state.movement.movementWarnings
  );
  const secondMovementWarnings = useSelector(
    (state) => state.movement.secondMovementWarnings
  );
  const cattleSecondInput = useSelector(
    (state) => state.movement.cattleSecondInput
  );
  const [searchInput, setSearchInput] = useState("");
  const [secondSearchInput, setSecondSearchInput] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [secondSpinner, setSecondSpinner] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSearchInput(event.target.value.toUpperCase().replace(/ /g, ""));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setCattleSearchInput(searchInput));
    if (searchInput.length === 0) {
      dispatch(setMovementWarnings("Please input a valid sample"));
      dispatch(setCattleMovementDataset({}));
    } else {
      setSpinner(true);
      fetch(`/sample/movements?sample_name=${searchInput}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data["warnings"]) {
            dispatch(setMovementWarnings(data["warning"]));
            dispatch(setCattleMovementDataset({}));
          } else {
            dispatch(setCattleMovementDataset(data));
            dispatch(setMovementWarnings(null));
          }
        })
        .then(() => {
          setSpinner(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          dispatch(setCattleMovementDataset({}));
          dispatch(
            setMovementWarnings(
              "Something went wrong: Please report the sample <a referrerpolicy='no-referrer' target='_blank' href='https://teams.microsoft.com/l/channel/19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2/General?groupId=9f4fc917-23c7-4ba4-b8ce-155c744d0152&tenantId='>here</a>"
            )
          );
          setSpinner(false);
        });
    }
  };

  const handleSecondChange = (event) => {
    setSecondSearchInput(event.target.value.toUpperCase().replace(/ /g, ""));
  };

  const handleSecondSubmit = () => {
    dispatch(setCattleSecondInput(secondSearchInput));
    if (secondSearchInput.length === 0) {
      dispatch(setSecondMovementWarnings("Please input a valid sample"));
      dispatch(setSecondMovementDataset({}));
    } else {
      setSecondSpinner(true);
      fetch(`/sample/movements?sample_name=${secondSearchInput}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data["warnings"]) {
            dispatch(setSecondMovementDataset({}));
            dispatch(setSecondMovementWarnings(data["warning"]));
          } else {
            dispatch(setSecondMovementDataset(data));
            dispatch(setSecondMovementWarnings(null));
          }
        })
        .then(() => {
          setSecondSpinner(false);
        })
        .catch((error) => {
          setSecondSpinner(false);
          dispatch(setSecondMovementDataset({}));
          dispatch(
            setSecondMovementWarnings(
              "Something went wrong: Please report the sample <a referrerpolicy='no-referrer' target='_blank' href='https://teams.microsoft.com/l/channel/19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2/General?groupId=9f4fc917-23c7-4ba4-b8ce-155c744d0152&tenantId='>here</a>"
            )
          );
          console.error("Error fetching data:", error);
        });
    }
  };

  useEffect(() => {
    setSearchInput(cattleSearchInput);
  }, [cattleSearchInput]);

  useEffect(() => {
    setSecondSearchInput(cattleSecondInput);
  }, [cattleSecondInput]);

  return (
    <div>
      <form className="sample-search" onSubmit={handleSubmit}>
        <div>
          <div class="govuk-heading-m " id="enter-sample-container">
            Enter Identifier or Submission
          </div>
          <div>
            <p>
              <input
                type="text"
                class="input__sampleID"
                value={searchInput}
                onChange={handleChange}
                placeholder="e.g. UK705113600438"
                name="Name"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="input-tooltip"
                title="Identifier or Submission Number"
              />
            </p>
            <div id="cattle-warning-text"></div>
          </div>
          <button
            className="my-2 govuk-button"
            style={{ marginBottom: "10px" }}
          >
            Show Cattle Movement
          </button>
          {spinner && (
            <div className="text-center" id="cattle-spinner-container">
              <output className="spinner-border text-secondary">
                <span className="visually-hidden">Loading...</span>
              </output>
            </div>
          )}
        </div>
      </form>
      {movementWarnings && (
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
          <span dangerouslySetInnerHTML={{ __html: movementWarnings }}></span>
        </span>
      )}
      <br></br>
      <div class="row">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <button
              class="accordion-button collapsed"
              id="btn__cattle-movement--1"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <span
                style={{ fontWeight: "bold", fontSize: "17px", color: "black" }}
              >
                Add Another Movement
              </span>
            </button>
            <div
              id="collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body" id="accordion__secondMovement">
                <div>
                  <p>
                    <input
                      value={secondSearchInput}
                      onChange={handleSecondChange}
                      type="text"
                      class="input__sampleID"
                      placeholder="e.g. UK705113600438"
                      name="Name"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-custom-class="input-tooltip"
                      title="Identifier or Submission Number"
                    />
                  </p>
                  <button
                    type="button"
                    class="govuk-button"
                    data-module="govuk-button"
                    style={{ marginBottom: "10px", width: "160px" }}
                    onClick={handleSecondSubmit}
                  >
                    Show Second Movement
                  </button>
                  {secondSpinner && (
                    <div className="text-center" id="cattle-spinner-container">
                      <output className="spinner-border text-secondary">
                        <span className="visually-hidden">Loading...</span>
                      </output>
                    </div>
                  )}
                  {secondMovementWarnings && (
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
                      <span
                        dangerouslySetInnerHTML={{
                          __html: secondMovementWarnings,
                        }}
                      ></span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LayersCheckbox
        checkedLayers={checkedLayers}
        countyAndHotspotLayers={countyAndHotspotLayers}
        handleCheckboxes={handleCheckboxes}
        setCountyAndHotspotLayers={setCountyAndHotspotLayers}
      />
    </div>
  );
};
export default CattlMovMapSidebar;
