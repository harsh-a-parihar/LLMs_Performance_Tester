const express = require("express");
const router = express.Router();
const queryModel = require("../models/models");
const Response = require("../models/responseModel");


// Query Model
router.post("/query", async (req, res) => {
    const { question, model } = req.body;
    if (!question || !model) {
        return res.status(400).json({ error: "Missing question or model" });
    }
    try {
        const response = await queryModel(model, question);
        await Response.create({ question, model, response, timestamp: Date.now() });
        res.json({ model, response });
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

// History
router.get("/history", async (req, res) => {
    try {
        const history = await Response.find().sort({ timestamp: -1 }).limit(50);
        res.json(history);
    } catch (error) {
        console.error("❌ Error fetching history:", error);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// Stats
router.get("/stats", async (req, res) => {
    try {
        const stats = await Response.aggregate([
            {
                $group: {
                    _id: "$model",
                    avgResponseLength: { $avg: { $strLenCP: "$response" } },
                },
            },
        ]);
        res.json(stats);
    } catch (error) {
        console.error("❌ Error fetching stats:", error);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

module.exports = router;