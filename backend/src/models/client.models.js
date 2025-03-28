import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    client : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    guest : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Guests'
    }
}, { timestamps : true})

export const Client = mongoose.model("Client", ClientSchema)