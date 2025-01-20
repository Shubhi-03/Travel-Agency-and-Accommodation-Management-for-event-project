import mongoose from 'mongoose'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    },
    phoneNumber : {
        type : String,
        required : true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, enum: ['Admin', 'EventManager', 'Client'], 
        required: true 
    },
    profilePictute : {
        type : String
    },
    refreshTokens: {
        type: String,
    }

}, {timestamps: true})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    console.log(this.password)
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};



export const User = mongoose.model("User", UserSchema);