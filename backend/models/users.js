const mongoose = require('mongoose');
const {z} = require('zod');

const userZodSchema = z.object({
    username: z.string().min(3).trim(),
    email: z.string().email().toLowerCase(),
    password: z.string().min(6),
    gamesPlayed: z.number().int().nonnegative().default(0),
    wins: z.number().int().nonnegative().default(0),
    losses: z.number().int().nonnegative().default(0),
    draws: z.number().int().nonnegative().default(0),
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },

    gamesPlayed: {
        type: Number,
        default: 0
    },

    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    draws: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
module.exports.userZodSchema = userZodSchema;