import { createSlice } from "@reduxjs/toolkit";

export const securitySlice = createSlice({
  name: "home",
  initialState: {
    showModal: true,
    latestDate: "N/A",
  },
  reducers: {
    hideModal: (state) => {
      state.showModal = false;
    },
    setLatestDate: (state, action) => {
      state.latestDate = action.payload;
    },
  },
});

export const { hideModal, setLatestDate } = securitySlice.actions;

export default securitySlice.reducer;
