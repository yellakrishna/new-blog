import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./../App.css";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="header">
            <h1>MERN Blog</h1>
            <button className="nav-toggle" onClick={() => setOpen(!open)}>
                ☰
            </button>
            <div className={`nav-links ${open ? "active" : ""}`}>
                <Link onClick={() => setOpen(false)} to="/">Home</Link>
                
                {user && (
                    <>
                        <Link onClick={() => setOpen(false)} to="/create">Create</Link>
                        <Link onClick={() => setOpen(false)} to="/profile">Profile</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                        <div className="user-circle">{user.username[0]}</div>
                        
                    </>
                )}

                {!user && (
                    <>
                        <Link onClick={() => setOpen(false)} to="/login">Login</Link>
                        <Link onClick={() => setOpen(false)} to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
