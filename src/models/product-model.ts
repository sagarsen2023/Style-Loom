import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner"
    }
})

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;