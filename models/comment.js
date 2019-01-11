var mongoose = require("mongoose");

// DB schema
var commentSchema = new mongoose.Schema({
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    text: {
        type: String,
        required: true
    },
    deal_id: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Deal'
        }
    }
});



module.exports = mongoose.model("Comment", commentSchema);