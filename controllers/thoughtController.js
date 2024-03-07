const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID" });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const newThoughtData = await Thought.create(req.body);
            res.json(newThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body }
            );
            if (!updatedThought) {
                res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.status(200).json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId }
            );
            if (!deletedThought) {
                res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.status(200).json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const reaction = await Reaction.create(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: reaction } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId } },
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with that ID' });
            }
            const deletedReaction = await Reaction.findOneAndDelete({ reactionId: req.params.reactionId });
            if (!deletedReaction) {
                res.status(404).json({ message: 'No reaction found with that ID' });
            }
            res.status(200).json(deletedReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}