import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
    name : "admin",
    initialState : {
        event: [],
        eventManager : [],
        travelAgency : [],
        accommodations : []
    },
    reducers : {
        addEventManager : (state, action)=>{
            state.eventManager = action.payload;
        },
        addTravelAgency : (state, action)=>{
            state.travelAgency = action.payload
        },
        addAccommodation : (state, action) =>{
            state.accommodations = action.payload;
        },
        addAllEvent : (state, action)=>{
            state.event = action.payload;
        }
    }
})

export const { addEventManager, addTravelAgency, addAccommodation, addAllEvent} = adminSlice.actions;
export default adminSlice.reducer;