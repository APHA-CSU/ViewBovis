import { createSlice } from "@reduxjs/toolkit";

export const cphSlice = createSlice({
  name: "cphsearch",
  initialState: {
    cphWarnings: null,
    cphMetadata: [],
    cphValue: { CPH: "" },
  },
  reducers: {
    setCphWarnings: (state, action) => {
      state.cphWarnings = action.payload;
    },
    setCphMetadata: (state, action) => {
      state.cphMetadata = [...action.payload];
    },
    setCphValue: (state, action) => {
      state.cphValue = action.payload;
    },
  },
});

export const { setCphWarnings, setCphMetadata, setCphValue } = cphSlice.actions;

export default cphSlice.reducer;
