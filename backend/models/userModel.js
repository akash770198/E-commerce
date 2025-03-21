import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel