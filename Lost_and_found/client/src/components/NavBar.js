import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext"; // Ensure the correct path

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/checkAuth", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setLoggedIn(data.logged_in))
      .catch(() => setLoggedIn(false));
  }, []);

  const handleLogout = async () => {
    await fetch("http://127.0.0.1:5001/api/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.reload(); // Refresh to update UI
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
      <ul style={{ display: "flex", listStyleType: "none", alignItems: "center" }}>
        <li style={{ marginRight: "20px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        </li>
        <li style={{ marginRight: "20px" }}>
          <Link to="/add-profile" style={{ color: "white", textDecoration: "none" }}>Add Profile</Link>
        </li>
        <li style={{ marginRight: "20px" }}>
          <Link to="/profiles" style={{ color: "white", textDecoration: "none" }}>All Profiles</Link>
        </li>
        <li style={{ marginRight: "20px" }}>
          <Link to="/messages" style={{ color: "white", textDecoration: "none" }}>Messages</Link>
        </li>
        {loggedIn ? (
          <li>
            <button onClick={handleLogout} style={{ color: "white", backgroundColor: "#555" }}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li style={{ marginRight: "20px" }}>
              <Link to="/registerUser" style={{ color: "white", textDecoration: "none" }}>Register</Link>
            </li>
            <li>
              <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
