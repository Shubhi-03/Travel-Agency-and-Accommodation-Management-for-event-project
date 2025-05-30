import { createSlice } from "@reduxjs/toolkit";

const EventSlice = createSlice({
  name: "event",
  initialState: {
    event: [],  // Initialize as an empty array instead of null
  },
  reducers: {
    addEvent: (state, action) => {
      state.event = action.payload;
    },
  },
});

export const { addEvent } = EventSlice.actions;
export default EventSlice.reducer;
