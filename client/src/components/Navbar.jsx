import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Blogify</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">{user.username}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
