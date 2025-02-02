// Define Schema for Model responses
const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
    question: String,
    model: String,
    response: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", responseSchema);