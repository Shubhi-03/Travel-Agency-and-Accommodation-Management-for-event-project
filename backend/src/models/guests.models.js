import mongoose, { mongo } from 'mongoose';

const GuestSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    email : {
        type:String,
        require:true
    },
    phoneNumber : {
        type:String,
        require:true
    },
    departure_date : {
        type : Date
    },
    departure_time : {
        type : String
    },
    location : {
        type : String
    },
    accommodation_days : {
        type : Number
    },
    modeOfTravel:{
        type:String
    },
    formStatus:{
        type:Boolean
    },
    comment:{
        type : String
    },
    event : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Event'
    }

}, {timestamps : true})

export const Guest = mongoose.model("Guest", GuestSchema)