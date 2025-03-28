import { createSlice } from "@reduxjs/toolkit";

const ClientSlice = createSlice({
  name: "client",
  initialState: {
    event: [], 
    guestList : [],
    bookedGuest : [],
    unBookedGuest : [],
    selectedGuest : null 
  },
  reducers: {
    addClientEvent: (state, action) => {
      state.event = action.payload;
    },
    addGuestList: (state, action) =>{
      state.guestList = action.payload;
    },
    addUnbookedGuest: (state, action)=>{
      state.unBookedGuest = action.payload;
    },
    addUnbookedGuest: (state, action)=>{
      state.bookedGuest = action.payload;
    },
    addSelectedGuest: (state, action)=>{
      state.selectedGuest = action.payload;
    }
  },
});

export const { addClientEvent, addGuestList, addUnbookedGuest, addBookedGuest, addSelectedGuest } = ClientSlice.actions;
export default ClientSlice.reducer;
