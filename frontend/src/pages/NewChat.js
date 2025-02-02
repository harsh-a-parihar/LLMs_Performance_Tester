import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ChatInterface from "../components/ChatInterface";
import "../styles/NewChat.css";

const NewChat = () => {
  const [question, setQuestion] = useState("");
  const [model, setModel] = useState("chatgpt");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recentChats, setRecentChats] = useState([]);

  useEffect(() => {
    // Fetch chat history on component mount
    axios
      .get("http://localhost:5000/api/history")
      .then((res) => {
        const chatTitles = res.data.map((chat) => chat.question);
        setRecentChats(chatTitles.slice(-5)); // Show only the last 5 recent chats
      })
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  const askModel = async () => {
    if (!question.trim()) {
      alert("Please enter a question!");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/query",
        { question, model },
        { headers: { "Content-Type": "application/json" } }
      );

      const modelResponse = res.data.response;

      // Update messages with the model's response
      setMessages((prev) => [
        ...prev,
        { sender: "model", text: modelResponse },
      ]);

      // Add the question to recent chats
      setRecentChats((prev) => [...prev, question].slice(-5)); // Keep only the last 5 chats
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to get response from backend!");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = (file) => {
    console.log("Uploaded file:", file);
  };

  const handleSelectChat = (chat) => {
    setMessages([{ sender: "user", text: chat }]);
    setQuestion(chat);
    askModel();
  };

  return (
    <div className="new-chat-container">
      <Sidebar
        onDocumentUpload={handleDocumentUpload}
        recentChats={recentChats}
        onSelectChat={handleSelectChat}
      />
      <ChatInterface
        askModel={askModel}
        setQuestion={setQuestion}
        question={question}
        response={response}
        loading={loading}
        setModel={setModel}
        model={model}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
};

export default NewChat;