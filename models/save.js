let mongoose = require("mongoose");

let saveSchema = new mongoose.Schema({
    deal: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Deal'
        }
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
});

module.exports = mongoose.model("Save", saveSchema);