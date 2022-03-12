import mongoose from 'mongoose';

const ShortnerSchema = new mongoose.Schema({
    link: { type: String, required: true },
    hits: { type: Number, default: 0 },
})