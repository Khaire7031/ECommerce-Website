import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    url: String,
    detailurl: String,
    title: Object,
    price: Object,
    quantity: Number,
    Description: String,
    discount: String,
    tagline: String
});


const Product = mongoose.model('product', productSchema);

export default Product;