const mongoose = require('mongoose');
const { Schema, model, Types } = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 25,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString('en-us')
    },
},
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;