import { createSlice } from "@reduxjs/toolkit";

export const securitySlice = createSlice({
  name: "home",
  initialState: {
    showModal: true,
    latestDate: "N/A",
    showLayers: false,
    navbarHeight: 90,
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
    setNavbarHeight: (state, action) => {
      state.navbarHeight = action.payload;
    },
  },
});

export const { hideModal, setLatestDate, setShowLayers, setNavbarHeight } =
  securitySlice.actions;

export default securitySlice.reducer;
