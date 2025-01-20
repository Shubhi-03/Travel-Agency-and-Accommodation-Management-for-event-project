import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema({
    name : {
        type : String, 
        require : true
    },
    description : {
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
    },
    remainingBudget : {
        type : Number
    }
    

   

}, {timestamps : true})

export const Event = mongoose.Schema("Event", eventsSchema);