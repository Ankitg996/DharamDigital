import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        trim:true,
        required: true
    },
    lastName: {
        type:String,
        trim:true,
        required:true
    },
    email:{
        type: String,
        trim:true,
        unique: true,
        required: true
    },
    phone:{
        type: Number,
        unique: true,
        required: true
    },
    gender:{
        type: String,
        enum: ['Male', 'Female','LGBTQ'],
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps:true})

export default mongoose.model('user', userSchema)