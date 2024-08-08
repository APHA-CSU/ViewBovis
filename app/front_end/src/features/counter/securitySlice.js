import { createSlice } from "@reduxjs/toolkit";

export const securitySlice = createSlice({
  name: "nextstrain",
  initialState: {
    showModal : true
  },
  reducers: {
    hideModal : (state) => {
      state.showModal = false;
    }
  },
});

export const {
hideModal
} = securitySlice.actions;

export default securitySlice.reducer;