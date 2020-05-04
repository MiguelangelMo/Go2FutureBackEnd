const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    headline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    fecha: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Project", ProjectSchema);