import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5001/api/profiles');
      const profiles = await response.json();
      
      const foundProfile = profiles.find(profile => profile.name.toLowerCase() === name.toLowerCase());

      if (foundProfile) {
        login(foundProfile); // Save user session
        alert('Login successful!');
        navigate('/'); // Redirect to Home
      } else {
        alert('User not found! Please check your name or create a profile.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
