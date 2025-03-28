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
        type : [String], 
        require : true
    },

}, {timestamps : true})

export const TravelAgency = mongoose.model("TravelAgency", travelAgencySchema);