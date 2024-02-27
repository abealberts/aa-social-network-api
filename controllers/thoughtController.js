const { Thought, User } = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    // Get a thought by ID
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            
            if (!thought) {
                return res.status(404).json({ message: 'No user found with the given ID.'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Create new thought
    async createThought(req, res) {
        try {
            //creates new thought
            const thought = await Thought.create(req.body);
            //updates user with created thought
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought created but no user with given ID can be found.'})
            }

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update thought by ID
    async updateThought(req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });

        if (!thought) {
            return res.status(404).json({ message: 'Thought with given ID cannot be found.' });
        }

        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    },
    // Delete thought by ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with the given ID.' });
            } else if (thought && !user) {
                return res.json({ message: 'Thought deleted, but no user'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create new reaction
    async createReaction(req, res) {
        try {
            //set new reaction data
            const newReaction = {
                reactionBody: req.body.reactionBody,
                username: req.body.username,
                };

            const thoughtId = req.params.thoughtId;

            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $push: { reactions: newReaction } },
                { new: true }
                );
                res.json(thought.toObject());
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete reaction by ID
    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;

            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { reactionId: reactionId } } },
                { new: true }
            );
            res.json(thought.toObject());
        } catch (err) {
            res.status(500).json(err);
        }
    },
}