import { configureStore } from "@reduxjs/toolkit";
import campersSlice from "./slices/campersSlice";

export const store = configureStore({
  reducer: {
    campers: campersSlice,
  },
});
