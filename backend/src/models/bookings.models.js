import mongoose from 'mongoose';

const BookingsSchema = new mongoose.Schema({
    guest : {
        type : mongoose.type.Schema.ObjectId,
        ref : 'User'
    },
    travelDetails : {
        type : String,
        require : true
    },
    accommodationDetails : {
        type : String,
        require : true
    },
    details: {
        type : String
    },
    travelAgency : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'TravelAgency'
    },
    accommodation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Accommodations'
    },

}, {timestamps : true})

export const booking = mongoose.Schema('booking', BookingsSchema)