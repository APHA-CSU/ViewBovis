import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const movementSlice = createSlice({
  name: "movement",
  initialState: {
    cattleMovementDataset: {},
    secondMovementDataset: {},
    movementWarnings: null,
    secondMovementWarnings: null,
    firstSearchSample: "",
    firstSearchSpinner: false,
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
    setFirstSearchSample: (state, action) => {
      state.firstSearchSample = action.payload;
    },
    setFirstSearchSpinner: (state, action) => {
      state.firstSearchSpinner = action.payload;
    },
  },
});

export const {
  setCattleMovementDataset,
  setSecondMovementDataset,
  setMovementWarnings,
  setSecondMovementWarnings,
  setFirstSearchSample,
  setFirstSearchSpinner,
} = movementSlice.actions;

export default movementSlice.reducer;

export const fetchCattleMovementDataset = createAsyncThunk(
  "movement/fetchCattleMovementDataset",
  async (params, { dispatch }) => {
    dispatch(setCattleMovementDataset({}));
    let searchInput = params.searchInput;
    if (searchInput.length < 1) {
      dispatch(setMovementWarnings("Please input a valid sample"));
      dispatch(setCattleMovementDataset({}));
    } else {
      dispatch(setFirstSearchSpinner(true));
      fetch(
        `/sample/movements?sample_name=${searchInput
          .toUpperCase()
          .replace(/ /g, "")}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data["warnings"]) {
            dispatch(setMovementWarnings(data["warning"]));
            dispatch(setCattleMovementDataset({}));
          } else {
            dispatch(setCattleMovementDataset(data));
            dispatch(setMovementWarnings(null));
          }
        })
        .then(() => {
          dispatch(setFirstSearchSpinner(false));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          dispatch(setCattleMovementDataset({}));
          dispatch(
            setMovementWarnings(
              "Something went wrong: Please report the sample <a referrerpolicy='no-referrer' target='_blank' href='https://teams.microsoft.com/l/channel/19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2/General?groupId=9f4fc917-23c7-4ba4-b8ce-155c744d0152&tenantId='>here</a>"
            )
          );
          dispatch(setFirstSearchSpinner(false));
        });
    }
  }
);
