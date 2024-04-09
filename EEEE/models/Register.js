const mongoose = require('mongoose');

// Define the registration schema
const registerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Create the Register model
const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
