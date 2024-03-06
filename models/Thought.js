const mongoose = require('mongoose');
const { Schema, model, Types } = require('mongoose');
// import Reaction from './Reaction';

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString('en-us')
    },
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 25,
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'reaction'
    }],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;