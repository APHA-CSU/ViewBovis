import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import movementSlice from '../features/counter/movementSlice'
import nextstrainSlice from '../features/counter/nextstrainSlice'
import securitySlice from '../features/counter/securitySlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    movement: movementSlice,
    nextstrain : nextstrainSlice,
    security : securitySlice
  },
})