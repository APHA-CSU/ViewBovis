import { createSlice } from "@reduxjs/toolkit";

export const nextstrainSlice = createSlice({
  name: "nextstrain",
  initialState: {
    nextStrainWarnings: null,
  },
  reducers: {
    setNextStrainWarnings: (state, action) => {
      state.nextStrainWarnings = action.payload;
    },
  },
});

export const { setNextStrainWarnings } = nextstrainSlice.actions;

export default nextstrainSlice.reducer;
