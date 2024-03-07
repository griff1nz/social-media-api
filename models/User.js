const mongoose = require('mongoose');
const { Schema, model, Types } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, match: /.+\@.+\..+/, unique: true /* Need to validate email somehow */ },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;