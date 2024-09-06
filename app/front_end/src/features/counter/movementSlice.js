import { createSlice } from "@reduxjs/toolkit";

export const movementSlice = createSlice({
  name: "movement",
  initialState: {
    cattleMovementDataset: {},
    secondMovementDataset: {},
    movementWarnings: null,
    secondMovementWarnings: null,
  },
  reducers: {
    setCattleMovementDataset: (state, action) => {
      state.cattleMovementDataset = action.payload;
    },
    setSecondMovementDataset: (state, action) => {
      state.secondMovementDataset = action.payload;
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
  setSecondMovementDataset,
  setMovementWarnings,
  setSecondMovementWarnings,
} = movementSlice.actions;

export default movementSlice.reducer;
