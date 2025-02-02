import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { AiOutlinePlus, AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

const Sidebar = ({ onDocumentUpload, recentChats, onSelectChat, onNewChat }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Top Section */}
      <div className="sidebar-header">
        <button className="icon-button" onClick={toggleSidebar}>
          {isCollapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
        </button>
        {!isCollapsed && (
          <button className="new-chat-button" onClick={onNewChat}>
            <AiOutlinePlus /> New Chat
          </button>
        )}
      </div>

      {!isCollapsed && (
        <>
          {/* Navigation Section */}
          <div className="section">
            <h4 className="section-title">Navigation</h4>
            <button className="sidebar-button" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
            <button className="sidebar-button" onClick={() => navigate("/newchat")}>
              Chats
            </button>
            <button className="sidebar-button" onClick={() => navigate("/models")}>
              Models
            </button>
          </div>

          {/* Recent Chats Section */}
          <div className="section">
            <h4 className="section-title">Recent Chats</h4>
            <ul className="recent-chats">
              {recentChats && recentChats.length > 0 ? (
                recentChats.map((chat, index) => (
                  <li
                    key={index}
                    className="chat-item"
                    onClick={() => onSelectChat(chat)}
                  >
                    {chat}
                  </li>
                ))
              ) : (
                <p className="no-chats">No recent chats</p>
              )}
            </ul>
          </div>

          {/* File Upload Section */}
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