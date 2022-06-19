'use strict';

import mongoose from "mongoose";

const ShortLinkSchema = new mongoose.Schema({
    shortLinkId: { type: String, required: true, unique: true },
    originalLink: { type: String, required: true, unique: true }
});

export const ShortLink = mongoose.models.ShortLink || mongoose.model('ShortLink', ShortLinkSchema);
