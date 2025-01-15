import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema({
    Name : {
        type : String, 
        require : true
    },
    Description : {
        type: String
    },
    startDate : {
        type : Date,
        require : true
    },
    endDate : {
        type: Date,
        require:true
    },

   

}, {timestamps : true})

export const TravelAgency = mongoose.Schema("TravelAgency", travelAgencySchema);