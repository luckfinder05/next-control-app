'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: "USER"
    }
});

module.exports = mongoose.model('role', Role);