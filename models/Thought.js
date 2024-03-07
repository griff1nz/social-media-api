const mongoose = require('mongoose');
const { Schema, model, Types } = require('mongoose');
const User = require('./User');
const Reaction = require('./Reaction');

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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    reactions: [Reaction],
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
thoughtSchema.pre('save', async function (next) {
    try {
      await User.updateOne(
        { _id: this.userId }, // You may need to adjust this query based on your data
        { $push: { thoughts: this._id } }
      );
      next();
    } catch (error) {
      next(error);
    }
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;