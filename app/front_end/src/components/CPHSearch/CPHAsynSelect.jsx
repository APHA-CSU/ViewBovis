import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { setShowPage } from "../../features/counter/securitySlice";
import {
  setSNPSample,
  setSNPDistance,
  fetchSNPMapDataset,
} from "../../features/counter/counterSlice";
import {
  fetchCattleMovementDataset,
  setFirstSearchSample,
} from "../../features/counter/movementSlice";
import {
  fetchNextstrainData,
  setNextstrainIdentifier,
  setNextstrainURL,
} from "../../features/counter/nextstrainSlice";
import { setCphWarnings, setCphValue } from "../../features/counter/cphSlice";
import { useState } from "react";

const CPHAsyncSelect = ({ setCphMetadata }) => {
  const cphValue = useSelector((state) => state.cphsearch.cphValue);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const loadOptions = async (inputString) => {
    if (inputString.replace(/ /g, "").length <= 2) {
      return [];
    }
    return fetch(
      "/sample/cphsearch?search_string=" +
        inputString.replace(/ /g, "").toUpperCase()
    )
      .then((response) => {
        if (response.ok) return response;
        else throw response.statusText || "Request Failed";
      })
      .then((response) => response.json())
      .then((json) => {
        return json.map((cell) => {
          cell["value"] = cell["CPH"];
          cell["label"] = cell["CPH"];
          return cell;
        });
      })
      .catch((error) => {
        return [{ label: `Error, ${error}`, value: "error", isDisabled: true }];
      });
  };

  const fetchCPHSamples = async () => {
    if (cphValue?.CPH?.length > 0) {
      fetch("/sample/cphsamples?cph=" + cphValue["CPH"])
        .then((response) => response.json())
        .then((metadata) => {
          let data = [...metadata];
          data.map((sample, index) => {
            if (sample["Warnings"]) {
              sample["tools"] = {
                warnings: sample["Warnings"],
              };
            } else {
              sample["tools"] = {
                snpmap: () => {
                  dispatch(setSNPSample(sample["Submission"]));
                  dispatch(setSNPDistance(1));
                  dispatch(
                    fetchSNPMapDataset({
                      snpSample: sample["Submission"],
                      snpDistance: 1,
                    })
                  );
                  dispatch(setShowPage("snpmap"));
                },
                movement: () => {
                  dispatch(setFirstSearchSample(sample["Submission"]));
                  dispatch(
                    fetchCattleMovementDataset({
                      searchInput: sample["Submission"],
                    })
                  );
                  dispatch(setShowPage("cattlemovement"));
                },
                nextstrain: async () => {
                  dispatch(setNextstrainIdentifier(sample["Submission"]));
                  dispatch(
                    fetchNextstrainData({ identifier: sample["Submission"] })
                  );
                  dispatch(
                    setNextstrainURL(
                      `${sample["Clade"]}?f_PreciseLocation=${sample[
                        "CPH"
                      ].replace(/ /g, "")}&p=grid`
                    )
                  );
                  dispatch(setShowPage("nextstrain"));
                },
              };
            }
            return sample;
          });
          setCphMetadata(data);
          dispatch(setCphWarnings(null));
        })
        .catch((error) => {
          dispatch(setCphWarnings("Something went wrong"));
          setCphMetadata([]);
        });
    } else {
      dispatch(setCphWarnings("Please select a sample"));
      setCphMetadata([]);
    }
  };

  return (
    <div
      className="govuk-input__wrapper"
      onPaste={(e) => setInputValue(e.clipboardData.getData("text"))}
    >
      <AsyncSelect
        type="text"
        placeholder="Search by CPH"
        loadOptions={loadOptions}
        onInputChange={(val) => setInputValue(val)}
        getOptionLabel={(e) =>
          e.value == "error" ? (
            <span style={{ color: "red" }}>{e.label}</span>
          ) : (
            e.label
          )
        }
        noOptionsMessage={() => {
          return inputValue.replace(/ /g, "").length < 3
            ? "Type atleast three characters"
            : "No options available";
        }}
        value={cphValue}
        onChange={(cph) => {
          dispatch(setCphValue(cph));
        }}
        isClearable={true}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            width: "60vw",
            color: "black",
            fontSize: "14px",
            height: "35px",
            boxShadow: "0 2px 0 #002d18",
            borderRadius: "0px",
            maxWidth: "500px",
          }),
        }}
      />
      <div
        className="govuk-button"
        aria-hidden="true"
        style={{ cursor: "pointer" }}
        onClick={() => fetchCPHSamples()}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CPHAsyncSelect;
