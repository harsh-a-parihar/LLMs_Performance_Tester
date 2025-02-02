import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Chats from "./pages/Chats";
import NewChat from "./pages/NewChat";
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/newchat" element={<NewChat />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/models" element={<Models />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="*" element={<div>404: Page Not Found</div>} /> {/* Catch-all route */}
            </Routes>
        </Router>
    );
};

export default App;