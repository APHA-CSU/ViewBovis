import { createSlice } from "@reduxjs/toolkit";

export const snpMapSlice = createSlice({
  name: "snpmap",
  initialState: {
    openSNPSidebar: true,
    snpMapJSON: {},
    snpSearchInput: "",
    snpDistance: 1,
    openSNPTable: false,
    snpmapCheckedLayers : {},
    snpCountyandHotspotLayers: {},
  },
  reducers: {
    toggleSNPsidebar: (state) => {
      state.openSNPSidebar = !state.openSNPSidebar;
    },
    setSNPMapJson: (state, action) => {
      state.SNPMapDataset = action.payload;
    },
    setSNPsample: (state, action) => {
      state.snpSearchInput = action.payload;
    },
    setSNPdistance: (state, action) => {
      state.snpDistance = action.payload;
    },
    toggleSNPTable: (state) => {
      state.openSNPTable = !state.openSNPTable;
    },
    setSNPmapCheckedLayers: (state,action) => {
      state.snpmapCheckedLayers = {...state.snpmapCheckedLayers,...action.payload}
    },
    setSNPmapCountyandHotspotLayers: (state,action) => {
      state.snpCountyandHotspotLayers = {...action.payload}
    }
  },
});


// Action creators are generated for each case reducer function
export const {
  toggleSNPsidebar,
  setSNPMapJson,
  setSNPsample,
  setSNPdistance,
  toggleSNPTable,
  setSNPmapCheckedLayers,
  setSNPmapCountyandHotspotLayers,
  setCattleSearchInput,
} = snpMapSlice.actions;

export default snpMapSlice.reducer;