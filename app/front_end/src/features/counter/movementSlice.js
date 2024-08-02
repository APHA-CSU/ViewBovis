import { createSlice } from "@reduxjs/toolkit";

export const movementSlice = createSlice({
  name: "movement",
  initialState: {
    cattleMovementDataset: {},
    cattleSearchInput: "",
    secondMovementDataset: {},
    cattleSecondInput: "",
  },
  reducers: {
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
  },
});

export const {
  setCattleMovementDataset,
  setCattleSearchInput,
  setCattleSecondInput,
  setSecondMovementDataset,
} = movementSlice.actions;

export default movementSlice.reducer;
