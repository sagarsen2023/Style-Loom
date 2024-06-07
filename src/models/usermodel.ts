import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
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
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }],
        default : []
    },
    cart : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }],
        default : []
    }
})

const User = mongoose.model("User", userSchema);

export default User;