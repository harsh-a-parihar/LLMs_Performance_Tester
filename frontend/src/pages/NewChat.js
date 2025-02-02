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
    axios
      .get("/api/history")
      .then((res) => setRecentChats(res.data.map((chat) => chat.question)))
      .catch((err) => console.error(err));
  }, []);

  const askModel = async () => {
    if (!question.trim()) return alert("Please enter a question!");
    setLoading(true);
    const userMessage = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("/api/query", { question, model });
      setMessages((prev) => [...prev, { sender: "model", text: res.data.response }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setQuestion("");
  };

  return (
    <div className="new-chat-container">
      <Sidebar
        onDocumentUpload={(file) => console.log("Uploaded file:", file)}
        recentChats={recentChats}
        onSelectChat={(chat) => setQuestion(chat)}
        onNewChat={handleNewChat}
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
      />
    </div>
  );
};

export default NewChat;