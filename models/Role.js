'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const role = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: "USER"
    }
});

// module.exports = mongoose.model('role', Role);
export const Role = mongoose.models.Role || mongoose.model('Role', role) 
