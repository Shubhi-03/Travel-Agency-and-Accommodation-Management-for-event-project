import { createSlice } from "@reduxjs/toolkit";

const ClientSlice = createSlice({
  name: "client",
  initialState: {
    event: [], 
    guestList : [] 
  },
  reducers: {
    addClientEvent: (state, action) => {
      state.event = action.payload;
    },
    addGuestList: (state, action) =>{
      state.guestList = action.payload;
    }
  },
});

export const { addClientEvent, addGuestList } = ClientSlice.actions;
export default ClientSlice.reducer;
