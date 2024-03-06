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
        // try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts').populate('friends');
            if (!user) {
                return res.status(404).json({ message: "No user found with that ID" });
            }
            res.json(user);
        // } catch (err) {
        //     res.status(500).json(err);
        // }
    },
    async createUser(req, res) {
        try {
            const newUserData = await User.create(req.body);
            res.json(newUserData);
        } catch(err) {
            res.status(500).json(err);
        }
    }
}