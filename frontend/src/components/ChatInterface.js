import React, { useState } from "react";
import "../styles/ChatInterface.css";

const ChatInterface = ({ askModel, setQuestion, question, response, loading, setModel, model, messages, setMessages }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    setQuestion(input); // Set the question for the model
    askModel(); // Call the API to fetch the response
    setInput(""); // Clear the input field
  };

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user" ? "user-message" : "model-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="loading">Loading...</div>}
      </div>
      <div className="chat-input-container">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="model-selector"
        >
          <option value="chatgpt">ChatGPT</option>
          <option value="deepseek">DeepSeek</option>
          <option value="llama3">Llama3</option>
          <option value="mistral">Mistral</option>
        </select>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;