'use strict';
import mongoose from 'mongoose';

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        ref: 'Role'
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// module.exports = mongoose.model('user', User);

export const User = mongoose.models.User || mongoose.model('User', user)