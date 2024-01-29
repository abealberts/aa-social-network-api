const { Thought, User } = require('../models');

module.exports = {
    //get all users
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
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
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete thought by ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with the given ID.' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create new reaction
    async createReaction(req, res) {
        try {
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete reaction by ID
    async deleteFriend(req, res) {
        try {
        } catch (err) {
            res.status(500).json(err);
        }
    },
}