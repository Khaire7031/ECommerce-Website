const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
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


const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
