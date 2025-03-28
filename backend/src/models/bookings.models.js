import mongoose from 'mongoose';

const BookingsSchema = new mongoose.Schema({
    guest : {
        type : mongoose.Schema.Types.ObjectId,
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
    approvalStatus : {
        type : Boolean
    },
    status : {
        type : String
    }

}, {timestamps : true})

export const booking = mongoose.model('booking', BookingsSchema)