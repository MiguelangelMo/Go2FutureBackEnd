const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: Boolean,
        default: false,
    },
    headline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    fecha: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("Task", TaskSchema);