// // querying different LLMs
// const OpenAI = require("openai");
// const dotenv = require("dotenv");
// const axios = require("axios");

// dotenv.config();

// //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// // all models query


// // OpenAI Client
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
  
//   // Model API Mapping
//   const MODEL_API_MAP = {
//       "gpt-4o-mini": "openai",
//       "deepseek": "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
//       "mistral": "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1",
//       "llama": "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B"
//   };
  
//   // Query Function
//   async function queryModel(model, question) {
//       try {
//           if (model === "gpt-4o-mini") {
//               // OpenAI API Call
//               const response = await openai.chat.completions.create({
//                   model: "gpt-4o-mini",
//                   messages: [{ role: "user", content: question }],
//               });
//               return response.choices[0].message.content;
//           } else if (MODEL_API_MAP[model]) {
//               // Hugging Face API Call
//               const API_URL = MODEL_API_MAP[model];
//               const headers = {
//                   "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//                   "Content-Type": "application/json"
//               };
  
//               const response = await axios.post(API_URL, { inputs: question }, { headers });
  
//               if (response.data && response.data[0] && response.data[0].generated_text) {
//                   return response.data[0].generated_text;
//               }
//               return "⚠️ No valid response from model.";
//           } else {
//               return `Model '${model}' is not supported.`;
//           }
//       } catch (error) {
//           console.error(`❌ Error querying ${model}:`, error.message);
//           return "❌ Error fetching response.";
//       }
//   }
  
// module.exports = queryModel;

// //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// // all models query using ollama

const axios = require("axios");

const MODEL_API_MAP = {
    "mistral": "mistral",
    "deepseek": "deepseek-r1:1.5b",
    "chatgpt": "openchat:7b",
    "llama3": "llama3",
    "phi": "phi:2.7b",
    "gemma": "gemma:2b"
};

async function queryModel(model, question) {
    if (!MODEL_API_MAP[model]) {
        console.log(`❌ Model '${model}' not found!`);
        return `Model '${model}' is not supported.`;
    }

    const API_URL = "http://127.0.0.1:11504/api/generate";  // Ollama API endpoint
    const headers = { "Content-Type": "application/json" };
    const payload = {
        model: MODEL_API_MAP[model],
        prompt: question,
        stream: false  // 🔹 Disabling streaming to get a full response
    };

    try {
        const response = await axios.post(API_URL, payload, { headers });
        console.log("✅ Response received:", response.data);

        return response.data.response || "⚠️ No valid response from model.";
    } catch (error) {
        console.error("❌ Ollama Query Error:", error.response ? error.response.data : error.message);
        return "❌ Error fetching response from model.";
    }
}

module.exports = queryModel;




