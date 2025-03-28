import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
    guestId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
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
    Accommodation_days : {
        type : Number
    }

}, {timestamps : true})

export const Guest = mongoose.model("Guest", GuestSchema)