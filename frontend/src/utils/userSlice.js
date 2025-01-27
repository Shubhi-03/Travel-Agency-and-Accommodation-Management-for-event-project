import { createSlice } from "@reduxjs/toolkit";

const persistedUser = JSON.parse(localStorage.getItem("user")) || null;
const persistedAuth = Boolean(persistedUser); 

const UserSlice = createSlice({
    name : "user",
    initialState : {
        info:persistedUser,
        authenticated: persistedAuth
    },
    reducers: {
        addUser: (state, action) => {
            state.info = action.payload;
            state.authenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        removeUser: (state, action) => {
            state.info = null;
            state.authenticated = false;
            localStorage.removeItem("user");
        },
    },

})

export const  { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;  