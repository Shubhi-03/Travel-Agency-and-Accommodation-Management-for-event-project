import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
    name : {
        type : String, 
        require : true
    },
    address : {
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
    amenities : {
        type : [string], 
        require : true
    },
    images : {
        type : [string]
    }

}, {timestamps : true})

export const Accommodation = mongoose.Schema("Accommodation", accommodationSchema);