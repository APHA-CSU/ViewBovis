import { createSlice } from "@reduxjs/toolkit";

export const cphSlice = createSlice({
  name: "cphsearch",
  initialState: {
    cphWarnings: null,
    cphValue: null,
  },
  reducers: {
    setCphWarnings: (state, action) => {
      state.cphWarnings = action.payload;
    },
    setCphValue: (state, action) => {
      state.cphValue = action.payload;
    },
  },
});

export const { setCphWarnings, setCphValue } = cphSlice.actions;

export default cphSlice.reducer;
