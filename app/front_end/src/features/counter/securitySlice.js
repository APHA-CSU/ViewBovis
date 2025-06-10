import { createSlice } from "@reduxjs/toolkit";

export const securitySlice = createSlice({
  name: "home",
  initialState: {
    showModal: true,
    latestDate: "N/A",
    showLayers: false,
    navbarHeight: 90,
    showHomePage: true,
    showSNPmapPage: false,
    showCattleMovementPage: false,
    showNextStrainPage: false,
    showHelpSupportPage: false,
    showFAQpage: false,
    showCPHSearchPage: false,
    activeLink: "home",
  },
  reducers: {
    hideModal: (state) => {
      state.showModal = false;
    },
    setLatestDate: (state, action) => {
      state.latestDate = action.payload;
    },
    setShowLayers: (state, action) => {
      state.showLayers = action.payload;
    },
    setNavbarHeight: (state, action) => {
      state.navbarHeight = action.payload;
    },
    setShowPage: (state, action) => {
      state.activeLink = action.payload;
      state.showHomePage = false;
      state.showSNPmapPage = false;
      state.showCattleMovementPage = false;
      state.showNextStrainPage = false;
      state.showHelpSupportPage = false;
      state.showFAQpage = false;
      state.showCPHSearchPage = false;
      switch (action.payload) {
        case "home":
          state.showHomePage = true;
          break;
        case "snpmap":
          state.showSNPmapPage = true;
          break;
        case "cattlemovement":
          state.showCattleMovementPage = true;
          break;
        case "nextstrain":
          state.showNextStrainPage = true;
          break;
        case "helpsupport":
          state.showHelpSupportPage = true;
          break;
        case "faq":
          state.showFAQpage = true;
          break;
        case "cphsearch":
          state.showCPHSearchPage = true;
          break;
        default:
          break;
      }
    },
  },
});

export const {
  hideModal,
  setLatestDate,
  setShowLayers,
  setNavbarHeight,
  setShowPage,
} = securitySlice.actions;

export default securitySlice.reducer;
