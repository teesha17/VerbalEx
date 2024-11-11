const mongoose = require('mongoose');

const passportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    passportNumber: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
    },
    placeOfBirth: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    placeOfIssue: {
        type: String,
    },
    dateOfIssue: {
        type: String,
    },
    expiryDate: {
        type: String,
    }
}, { timestamps: true });

const Passport = mongoose.model('Passport', passportSchema);

module.exports = Passport;
