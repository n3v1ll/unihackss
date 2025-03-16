import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AddProfile from "./pages/AddProfile";
import AllProfiles from "./pages/AllProfiles";
import Messages from "./pages/Messages";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  // ✅ Check if user is logged in
  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/checkAuth", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.logged_in) {
          setUser(data.email);
        }
      })
      .catch((err) => console.error("Error checking auth:", err));
  }, []);

  return (
    <Router>
      <AuthProvider>
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/profiles" element={<AllProfiles />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/registerUser" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
