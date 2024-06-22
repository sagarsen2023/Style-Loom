import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    wishlist : {
        type : Array,
        default : []
    },
    cart : {
        type : Array,
        default : []
    }
})

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;