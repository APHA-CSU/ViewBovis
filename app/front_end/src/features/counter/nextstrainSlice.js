import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const nextstrainSlice = createSlice({
  name: "nextstrain",
  initialState: {
    nextStrainWarnings: null,
    nextstrainURL: null,
    nextstrainIdentifier: "",
    nextstrainDataset: {},
  },
  reducers: {
    setNextStrainWarnings: (state, action) => {
      state.nextStrainWarnings = action.payload;
    },
    setNextstrainURL: (state, action) => {
      state.nextstrainURL = action.payload;
    },
    setNextstrainIdentifier: (state, action) => {
      state.nextstrainIdentifier = action.payload;
    },
    setNextstrainDataset: (state, action) => {
      state.nextstrainDataset = action.payload;
    },
  },
});

export const {
  setNextStrainWarnings,
  setNextstrainURL,
  setNextstrainIdentifier,
  setNextstrainDataset,
} = nextstrainSlice.actions;

export default nextstrainSlice.reducer;

export const fetchNextstrainData = createAsyncThunk(
  "nextstrain/fetchNextstrainData",
  async (params, { dispatch }) => {
    let identifier = params.identifier;
    const response = await fetch(
      `/sample?sample_name=${identifier.toUpperCase().replace(/ /g, "")}`
    );

    if (!response.ok) {
      dispatch(
        setNextStrainWarnings(
          "Something went wrong: Please report the sample <a referrerpolicy='no-referrer' target='_blank' href='https://teams.microsoft.com/l/channel/19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2/General?groupId=9f4fc917-23c7-4ba4-b8ce-155c744d0152&tenantId='>here</a>"
        )
      );
      dispatch(setNextstrainDataset({}));
    } else {
      const json = await response.json();
      if (json["warnings"]) {
        dispatch(setNextStrainWarnings(json["warning"]));
        dispatch(setNextstrainDataset({}));
      } else {
        // Create an array containing table data
        let tableData = [
          {
            cph: `${json.cph}`,
            county: `${json.county}`,
            af: `${json.submission}`,
            eartag: `${json.identifier}`,
            clade: `${json.clade}`,
          },
        ];
        dispatch(setNextstrainDataset({ ...tableData }));
        dispatch(setNextStrainWarnings(null));
      }
    }
  }
);
