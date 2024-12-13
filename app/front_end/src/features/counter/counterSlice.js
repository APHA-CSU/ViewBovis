import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const snpMapSlice = createSlice({
  name: "snpmap",
  initialState: {
    openSNPTable: false,
    snpmapWarnings: null,
    snpSample: "",
    snpDistance: 1,
    snpDataset: {},
    snpSidebarSpinner: false,
  },
  reducers: {
    toggleSNPTable: (state) => {
      state.openSNPTable = !state.openSNPTable;
    },
    setSNPmapWarnings: (state, action) => {
      state.snpmapWarnings = action.payload;
    },
    setSNPSample: (state, action) => {
      state.snpSample = action.payload;
    },
    setSNPDistance: (state, action) => {
      state.snpDistance = action.payload;
    },
    setSNPDataset: (state, action) => {
      state.snpDataset = action.payload;
    },
    setSNPSidebarSpinner: (state, action) => {
      state.snpSidebarSpinner = action.payload;
    },
  },
});

export const {
  toggleSNPsidebar,
  toggleSNPTable,
  setSNPmapWarnings,
  setSNPSample,
  setSNPDistance,
  setSNPDataset,
  setSNPSidebarSpinner,
} = snpMapSlice.actions;

export default snpMapSlice.reducer;

export const fetchSNPMapDataset = createAsyncThunk(
  "snpmap/fetchSNPDataset",
  async (params, { dispatch }) => {
    dispatch(setSNPDataset({}));
    dispatch(setSNPmapWarnings(null));
    let snpSample = params?.snpSample.replace(/ /g, "").toUpperCase();
    let snpDistance = params?.snpDistance;
    if (snpSample.length > 0) {
      dispatch(setSNPSidebarSpinner(true));
      fetch(
        `/sample/related?sample_name=${snpSample}&snp_distance=${snpDistance}`
      )
        .then((res) => {
          if (!res.ok) {
            console.error(res);
            return {};
          } else return res.json();
        })
        .then((res) => {
          if (Object.keys(res).length > 0) {
            if (res["warnings"]) {
              dispatch(setSNPDataset({}));
              dispatch(setSNPmapWarnings(res["warning"]));
            } else {
              dispatch(setSNPDataset(res));
              dispatch(setSNPmapWarnings(null));
            }
          } else {
            dispatch(setSNPDataset({}));
            dispatch(
              setSNPmapWarnings(
                "Something went wrong: Please report the sample and snp distance <a referrerpolicy='no-referrer' target='_blank' href='https://teams.microsoft.com/l/channel/19%3AWjZwu_WAoBEUo4LzTOKVHI6J35X3EHNIXt7o4H7il6E1%40thread.tacv2/General?groupId=9f4fc917-23c7-4ba4-b8ce-155c744d0152&tenantId='>here</a>"
              )
            );
          }
        })
        .then(() => {
          dispatch(setSNPSidebarSpinner(false));
        })
        .catch((error) => {
          dispatch(setSNPDataset({}));
          dispatch(setSNPSidebarSpinner(false));
          dispatch(setSNPmapWarnings("Request failed"));
          console.error("Error fetching data:", error);
        });
    } else {
      dispatch(setSNPmapWarnings("Sample name cannot be empty"));
    }
  }
);
