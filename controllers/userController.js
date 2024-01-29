const { User, Thought } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');
            
            if (!user) {
                return res.status(404).json({ message: 'No user found with the given ID.'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Create new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found with the given ID.' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and user content deleted.' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add friend to user friend list
    
    async addFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
            const friend = req.params.friendId
            //do something to add friend to list
            res.json(friend, {message: 'not yet functional'})
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete friend from user friend list
    async deleteFriend(req, res) {
        try {
            //do something to delete friend from list
            const friend = req.params.friendId
            res.json(friend, {message: 'not yet functional'})
        } catch (err) {
            res.status(500).json(err);
        }
    },
}