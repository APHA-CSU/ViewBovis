import { createSlice } from "@reduxjs/toolkit";

export const movementSlice = createSlice({
  name: "movement",
  initialState: {
    cattleMovementDataset: "",
    cattleSearchInput: "",
  },
  reducers: {
    setCattleMovementDataset: (state, action) => {
      state.cattleMovementDataset = action.payload
    },
    setCattleSearchInput: (state, action) => {
      state.cattleSearchInput = action.payload
    },
  },
});


// Action creators are generated for each case reducer function
export const {
  setCattleMovementDataset,setCattleSearchInput
} = movementSlice.actions;

export default movementSlice.reducer; 