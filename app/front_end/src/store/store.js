import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import movementSlice from '../features/counter/movementSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    movement: movementSlice
  },
})