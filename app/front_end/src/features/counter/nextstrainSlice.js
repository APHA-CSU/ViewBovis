import { createSlice } from "@reduxjs/toolkit";

export const nextstrainSlice = createSlice({
  name: "nextstrain",
  initialState: {
    nextstrainSearchSample: "",
    nextStrainDataset: {},
    nextStrainIframeURL: null,
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
  },
});

export const {
  setNextstrainSearchSample,
  setNextstrainDataset,
  setNextstrainIframeURL,
} = nextstrainSlice.actions;

export default nextstrainSlice.reducer;
