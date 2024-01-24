const { Schema, model } = require('mongoose');

//User model schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please use a valid email address.'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Virtual property 'friendCount' gets total # of friends a specific User has
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })
    .set(function (v) {
        this.set(v);
    });

//Initialize User Model
const User = model('user', userSchema);

module.exports = User;