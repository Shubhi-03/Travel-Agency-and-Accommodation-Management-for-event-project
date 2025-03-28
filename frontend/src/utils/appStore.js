
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import eventReducer from "./eventSlice.js"
import clientReducer from "./clientSlice.js";
import adminReducer from "./adminSlice.js"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    client: clientReducer,
    admin: adminReducer 
  },
});

export default appStore;