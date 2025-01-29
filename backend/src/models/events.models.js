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
            name : {type : String}, 
            phoneNumber : {type : String},
            email : {type : String},
            modeOfTravel : {type : String},
            accommodationDays : {type : Number}
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
      },
    

   

}, {timestamps : true})

export const Event = mongoose.model("Event", eventsSchema);