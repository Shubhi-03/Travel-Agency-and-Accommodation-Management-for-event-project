import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true
    },
    Email : {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    },
    PhoneNumber : {
        type : String,
        required : true
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'EventManager', 'Client'], required: true },

}, {timestamps: true})

export const User = mongoose.model("User", UserSchema);