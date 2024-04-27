

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    thumbnail: {
        type: String
    }
});

const CartSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    products: [ProductSchema]
});

const CartUser = mongoose.model('CartUser', CartSchema);

module.exports = CartUser;
