let mongoose = require("mongoose");
let likeSchema = require("../models/like");

let dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
dealSchema.index({'$**': 'text'});//search text in search bar

module.exports = mongoose.model("Deal", dealSchema);

// middleware
dealSchema.pre('remove', function(next) {
    likeSchema.remove({'deal.id': this._id}, next);
});