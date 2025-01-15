import mongoose from 'mongoose';

const travelAgencySchema = new mongoose.Schema({
    Name : {
        type : String, 
        require : true
    },
    PointOfContact : 
        [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
            }
        ],
    Services : {
        type : [string], 
        require : true
    },

}, {timestamps : true})

export const TravelAgency = mongoose.Schema("TravelAgency", travelAgencySchema);