// importing mongoose
const mongoose = require('mongoose');


//creating user schema for authentication
const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true

    }
}, {
    timestamps: true
});

//Creating user model
const User = mongoose.model('User', userSchema);

//Exporting user model
module.exports = User;