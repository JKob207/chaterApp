const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});

const User = mongoose.model("users", UserSchema);
module.exports = User