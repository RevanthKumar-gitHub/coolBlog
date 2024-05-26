import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
const Store = configureStore({
  reducer: {
    app: appSlice,
  },
});

export default Store;
