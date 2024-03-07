const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts').populate('friends');
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const newUserData = await User.create(req.body);
            res.json(newUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ id: req.params.id });
            res.status(200).json(deletedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            // Search for friend first to make sure the user actually exists
            const newFriend = await User.findOne(
                { _id: req.params.friendId });
            if(!newFriend) {
                res.status(404).json({ message: 'No user found with that ID' });
            }
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { friends: req.params.friendId } }
            );
            if (!updatedUser) {
                return res.status(404).json({
                    message: "No user found with that ID"
                });
            }
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const deletedFriend = await User.findOne({_id: req.params.friendId});
            if (!deletedFriend) {
                res.status(404).json({ message: 'No user found with that ID'});
            }
            const updatedUser = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $pull: { friends: req.params.friendId }}
            );
            if (!updatedUser) {
                res.status(404).json({ message: 'No user found with that ID' });
            }
            res.status(200).json(updatedUser);
        } catch(err) {
            res.status(500).json(err);
        }
    }
}