import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
    <header>
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/models">Models</Link>
            <Link to="/chats">Chats</Link>
        </nav>
    </header>
);

export default Header;