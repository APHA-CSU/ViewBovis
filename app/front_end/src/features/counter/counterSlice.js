import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    openSNPSidebar: true
  },
  reducers: {
    toggleSNPsidebar: (state) => {
      state.openSNPSidebar = !(state.openSNPSidebar)
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleSNPsidebar } = counterSlice.actions

export default counterSlice.reducer