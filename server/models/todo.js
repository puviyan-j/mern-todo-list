const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        list: {
            type: String,
            required: true
        }
        
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("todo", todoSchema)