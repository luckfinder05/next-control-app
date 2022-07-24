'use strict';
import mongoose from 'mongoose';
import OrderSchema from './Order';

const DocumentSchema = new mongoose.Schema({
    docNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    docDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    orders: [OrderSchema],
    contractor: {
        type: String,
        required: true
    },
    surveyor: {
        type: String,
        required: true
    },
    correctedAt: [{
        type: Date,
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});


export const Document = mongoose.models.Document || mongoose.model('Document', DocumentSchema) 