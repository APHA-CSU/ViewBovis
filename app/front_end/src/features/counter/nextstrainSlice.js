import { createSlice } from "@reduxjs/toolkit";

export const nextstrainSlice = createSlice({
  name: "nextstrain",
  initialState: {
    nextstrainSearchSample: "",
    nextStrainDataset: {},
    nextStrainIframeURL: null,
    nextStrainWarnings: null,
  },
  reducers: {
    setNextstrainSearchSample: (state, action) => {
      state.nextstrainSearchSample = action.payload;
    },
    setNextstrainDataset: (state, action) => {
      state.nextStrainDataset = action.payload;
    },
    setNextstrainIframeURL: (state, action) => {
      state.nextStrainIframeURL = action.payload;
    },
    setNextStrainWarnings: (state, action) => {
      state.nextStrainWarnings = action.payload;
    },
  },
});

export const {
  setNextstrainSearchSample,
  setNextstrainDataset,
  setNextstrainIframeURL,
  setNextStrainWarnings,
} = nextstrainSlice.actions;

export default nextstrainSlice.reducer;
