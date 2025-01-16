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
    budget : {
        type : Number,
        require : true
    }
    

   

}, {timestamps : true})

export const Event = mongoose.Schema("Event", eventsSchema);