const mongoose = require('mongoose');
const { Schema, model, Types } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, match: /.+\@.+\..+/, unique: true /* Got the regex from https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email */ },
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