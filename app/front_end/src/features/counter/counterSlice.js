import { createSlice } from "@reduxjs/toolkit";

export const snpMapSlice = createSlice({
  name: "snpmap",
  initialState: {
    openSNPTable: false,
    snpmapWarnings: null,
  },
  reducers: {
    toggleSNPTable: (state) => {
      state.openSNPTable = !state.openSNPTable;
    },
    setSNPmapWarnings: (state, action) => {
      state.snpmapWarnings = action.payload;
    },
  },
});

export const { toggleSNPsidebar, toggleSNPTable, setSNPmapWarnings } =
  snpMapSlice.actions;

export default snpMapSlice.reducer;
