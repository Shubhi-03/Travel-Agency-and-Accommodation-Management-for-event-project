import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name : "user",
    initialState : {
        info:null,
        authenticated:true
    },
    reducers: {
        addUser: (state, action) => {
            state.info = action.payload;
            state.authenticated = true
        },
        removeUser: (state, action) => {
            state.info = null;
            state.authenticated = false;
        },
    },

})

export const  { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;  