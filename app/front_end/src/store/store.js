import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import movementSlice from '../features/counter/movementSlice'
import nextstrainSlice from '../features/counter/nextstrainSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    movement: movementSlice,
    nextstrain : nextstrainSlice
  },
})