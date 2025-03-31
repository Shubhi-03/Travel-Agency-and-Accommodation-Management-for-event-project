import mongoose from 'mongoose';

const BookingsSchema = new mongoose.Schema({
    guest : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Guest'
    },
    travelDetails : {
        arrivalDate :{type:Date},
        departureDate :{type:Date},
        preference :{type:String},
        venue :{type:String},
        budget :{type:Number},
    },
    accommodationDetails : {
        arrivalDate :{type:Date},
        departureDate :{type:Date},
        preference :{type:String},
        venue :{type:String},
        budget :{type:Number},
        accommodation_days :{type:Number}
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
    travelApprovalStatus : {
        type : Boolean
    },
    accommodationApprovalStatus : {
        type : Boolean
    }

}, {timestamps : true})

export const booking = mongoose.model('booking', BookingsSchema)