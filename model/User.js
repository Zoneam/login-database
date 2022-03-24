const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Hashing user password
userSchema.pre('save', async function (next) {
    //Only hashing password if new creating new user or modifing the user
    if (this.isNew || this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            return next();
        } catch(err) {
            return next(err);
        }
    }
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);