const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const queryModel = require('./models/models');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const apiRoutes = require("./routes/api");

// ✅ Validate MONGO_URI
const mongoUri = process.env.MONGO_URI;
if (!mongoUri || !mongoUri.startsWith("mongodb")) {
    console.error("❌ MONGO_URI is missing or invalid in .env file.");
    process.exit(1); // Stop the server if MONGO_URI is not set
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected!"))
    .catch(error => console.error("MongoDB connection error;", error));


// Handle Api requests
// app.post('/query', async (req, res) => {
//     const { question, model } = req.body;
//     if (!question || !model) {
//         return res.status(400).json({ error: 'Missing question or model' });
//     }
//     try {
//         const response = await queryModel(model, question);
//         //save response to database
//         await Response.create({ question, model, response, timestamp: Date.now() });
//         res.json({ model, response });
//     } catch (error) {
//         console.error("❌ Server Error:", error);
//         res.status(500).json({ error: "Failed to process request" });
//     }
// });

// // Api for computing model performance stats
// app.get("/stats", async (req, res) => {
//     const stats = await Response.aggregate([
//         { $group: { _id: "$model", avgLength: { $avg: { $strLenCP: "$response" } } } }
//     ]);
//     res.json(stats);
// });

// // Store History of queries
// app.get("/history", async (req, res) => {
//     try {
//         const history = await Response.find().sort({ timestamp: -1 }).limit(50); // Get latest 50 responses
//         res.json(history);
//     } catch (error) {
//         console.error("❌ Error fetching history:", error);
//         res.status(500).json({ error: "Failed to fetch history" });
//     }
// });

// Use API routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


