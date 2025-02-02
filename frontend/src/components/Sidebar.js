import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ onDocumentUpload, recentChats, onSelectChat }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="toggle-button">
          {isCollapsed ? ">" : "<"}
        </button>
        {!isCollapsed && (
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
        )}
      </div>
      {!isCollapsed && (
        <>
          <div className="section">
            <h4 className="section-title">Navigation</h4>
            <button
              className="sidebar-button"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="sidebar-button"
              onClick={() => navigate("/newchat")}
            >
              Chats
            </button>
            <button
              className="sidebar-button"
              onClick={() => navigate("/models")}
            >
              Models
            </button>
          </div>
          <div className="section">
            <h4 className="section-title">Recent Chats</h4>
            <ul className="recent-chats">
              {recentChats.map((chat, index) => (
                <li
                  key={index}
                  className="chat-item"
                  onClick={() => onSelectChat(chat)}
                >
                  {chat}
                </li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h4 className="section-title">Upload Documents</h4>
            <input
              type="file"
              className="file-input"
              onChange={(e) => onDocumentUpload(e.target.files[0])}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;