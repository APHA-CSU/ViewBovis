import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import movementSlice from "../features/counter/movementSlice";
import nextstrainSlice from "../features/counter/nextstrainSlice";
import securitySlice from "../features/counter/securitySlice";
import cphSlice from "../features/counter/cphSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    movement: movementSlice,
    nextstrain: nextstrainSlice,
    security: securitySlice,
    cphsearch: cphSlice,
  },
});
