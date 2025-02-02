import React from "react";

const InputSection = ({ question, setQuestion, model, setModel, askModel }) => (
    <div className="input-section">
        <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input-field"
        />
        <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="dropdown"
        >
            <option value="chatgpt">ChatGPT (OpenChat)</option>
            <option value="mistral">Mistral</option>
            <option value="llama3">LLaMA 3</option>
            <option value="deepseek">DeepSeek</option>
            <option value="phi">Phi2</option>
            <option value="gemma">Gemma</option>
        </select>
        <button onClick={askModel} className="query-button">
            Query
        </button>
    </div>
);

export default InputSection;