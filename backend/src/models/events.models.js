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
    },
    venue : {
        type : String,
        require : true
    },
    client : [
        {
            name : String, 
            phoneNumber : String,
            email : String,
            modeOfTravel : String,
            accommodationDays : Number
        }
    ]
    

   

}, {timestamps : true})

export const Event = mongoose.Schema("Event", eventsSchema);