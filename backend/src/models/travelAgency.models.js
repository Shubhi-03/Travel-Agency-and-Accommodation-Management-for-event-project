import mongoose from 'mongoose';

const travelAgencySchema = new mongoose.Schema({
    name : {
        type : String, 
        require : true
    },
    pointOfContact : 
        [
            {
                name : {type : String},
                PhoneNo : {type : String},
                email : {type:String}
            }
        ],
    services : {
        type : [string], 
        require : true
    },

}, {timestamps : true})

export const TravelAgency = mongoose.Schema("TravelAgency", travelAgencySchema);