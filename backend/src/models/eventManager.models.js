import mongoose from "mongoose";

const EventManagerSchema = new mongoose.Schema({
    eventManagerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    events : 
        [
            {type : mongoose.Schema.Types.ObjectId,
            ref : 'Events'}
        ]
    

}, {timestamps : true})

export const EventManager = mongoose.model('EventManager', EventManagerSchema)