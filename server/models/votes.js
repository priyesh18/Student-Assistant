var mongoose = require('mongoose');

var voteSchema = mongoose.Schema({
    value: {
        type: Number,
        min: -1,
        max: +1
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            //unique: true,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model("Vote", voteSchema);