import { createSlice } from "@reduxjs/toolkit";

export const securitySlice = createSlice({
  name: "home",
  initialState: {
    showModal: true,
    latestDate: "N/A",
    showLayers: false,
  },
  reducers: {
    hideModal: (state) => {
      state.showModal = false;
    },
    setLatestDate: (state, action) => {
      state.latestDate = action.payload;
    },
    setShowLayers: (state, action) => {
      state.showLayers = action.payload;
    },
  },
});

export const { hideModal, setLatestDate, setShowLayers } =
  securitySlice.actions;

export default securitySlice.reducer;
