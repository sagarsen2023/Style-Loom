import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    products : {
        type : Array,
        default : []
    }
})

const Seller = mongoose.models.seller || mongoose.model("seller", sellerSchema);
export default Seller;