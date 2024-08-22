import { createSlice } from "@reduxjs/toolkit";

export const movementSlice = createSlice({
  name: "movement",
  initialState: {
    openMovementSidebar: true,
    cattleMovementDataset: {},
    cattleSearchInput: "",
    secondMovementDataset: {},
    cattleSecondInput: "",
    movementCheckedLayers: {},
    movementCountyandHotspotLayers: {},
    movementWarnings: null,
    secondMovementWarnings: null,
  },
  reducers: {
    toggleMovementSidebar: (state) => {
      state.openMovementSidebar = !state.openMovementSidebar;
    },
    setCattleMovementDataset: (state, action) => {
      state.cattleMovementDataset = action.payload;
    },
    setCattleSearchInput: (state, action) => {
      state.cattleSearchInput = action.payload;
    },
    setCattleSecondInput: (state, action) => {
      state.cattleSecondInput = action.payload;
    },
    setSecondMovementDataset: (state, action) => {
      state.secondMovementDataset = action.payload;
    },
    setMovementCheckedLayers: (state, action) => {
      state.movementCheckedLayers = { ...action.payload };
    },
    setMovementCountyandHotspotLayers: (state, action) => {
      state.movementCountyandHotspotLayers = { ...action.payload };
    },
    setMovementWarnings: (state, action) => {
      state.movementWarnings = action.payload;
    },
    setSecondMovementWarnings: (state, action) => {
      state.secondMovementWarnings = action.payload;
    },
  },
});

export const {
  setCattleMovementDataset,
  setCattleSearchInput,
  setCattleSecondInput,
  setSecondMovementDataset,
  setMovementCheckedLayers,
  setMovementCountyandHotspotLayers,
  toggleMovementSidebar,
  setMovementWarnings,
  setSecondMovementWarnings
} = movementSlice.actions;

export default movementSlice.reducer;
