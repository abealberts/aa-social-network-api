const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const ObjectId = Schema.Types.ObjectId;

//Thought model schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: new ObjectId,
        },
        reactionBody: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Virtual property 'reactionCount' gets total # of reactions tied to a specific thought
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })
    .set(function (v) {
        this.set(v);
});

//Virtual property formatTime formats the timestamp on query
reactionSchema
.virtual('formatTime')
.get(function () {
    const time = this.createdAt;
    if (time) {
        return dayjs(day);
    }
    return;
});

//Initialize Thought Model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;