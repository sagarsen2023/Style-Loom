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
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }],
        default : []
    }
})

const Seller = mongoose.models.seller || mongoose.model("seller", sellerSchema);
export default Seller;