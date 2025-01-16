import mongoose from 'mongoose';

const travelAgencySchema = new mongoose.Schema({
    Name : {
        type : String, 
        require : true
    },
    PointOfContact : 
        [
            {
                name : {type : String},
                PhoneNo : {type : String},
                email : {type:String}
            }
        ],
    Services : {
        type : [string], 
        require : true
    },

}, {timestamps : true})

export const TravelAgency = mongoose.Schema("TravelAgency", travelAgencySchema);