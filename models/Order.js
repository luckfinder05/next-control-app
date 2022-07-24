'use strict';
import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema({
  orderNum: {
    type: String,
    required: true,
    unique: true,
  },
  orderText: {
    type: String,
    required: true,
    index: true
  },
  violation: {
    type: String,
    required: true,
    index: true
  },
  place: {
    type: String,
    required: true
  },
  images: [{ type: String }],
  resolved: {
    type: String,
    enum: ['Устранено', 'Не устранено', 'В работе']
  },
  resolvedDate: {
    type: Date
  },
  correctedAt: {
    type: Array,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema) 