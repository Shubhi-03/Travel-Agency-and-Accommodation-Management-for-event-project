
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import eventReducer from "./eventSlice.js"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer 
  },
});

export default appStore;