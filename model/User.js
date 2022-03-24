const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
        min:2
    },
    lastName: {
        type: String,
        required: true,
        max: 30,
        min: 2
    },
    age: {
        type: Number,
        required: false,
        min: 18,
        max: 150
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);