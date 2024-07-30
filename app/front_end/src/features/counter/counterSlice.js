import { createSlice } from "@reduxjs/toolkit";

export const snpMapSlice = createSlice({
  name: "snpmap",
  initialState: {
    openSNPSidebar: true,
    SNPMapDataset: {},
    snpSearchInput : "",
    snpDistance: 1
    
  },
  reducers: {
    toggleSNPsidebar: (state) => {
      state.openSNPSidebar = !state.openSNPSidebar;
    },
    setSNPmapDataset: (state, action) => {
      state.SNPMapDataset = action.payload;
    },
    setSNPsample : (state,action) => {
      state.snpSearchInput = action.payload
    },
    setSNPdistance: (state,action) => {
      state.snpDistance = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { toggleSNPsidebar, setSNPmapDataset,setSNPsample,setSNPdistance } = snpMapSlice.actions;

export default snpMapSlice.reducer;
