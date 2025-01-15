import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
    Name : {
        type : String, 
        require : true
    },
    Address : {
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
    Amenities : {
        type : [string], 
        require : true
    },
    Images : {
        type : [string]
    }

}, {timestamps : true})

export const Accommodation = mongoose.Schema("Accommodation", accommodationSchema);