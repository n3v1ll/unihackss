import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

function HomePage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <h2>Please log in to see your profile.</h2>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Welcome, {user.name}!</h2>
      <div style={{ border: '1px solid #ddd', padding: '15px', width: '50%', margin: 'auto', borderRadius: '10px' }}>
        <h3>Your Profile</h3>
        <p><strong>Education:</strong> {user.education}</p>
        <p><strong>Skills:</strong> {user.skills}</p>
        <p><strong>Interests:</strong> {user.interests}</p>
        <p><strong>Hobbies:</strong> {user.hobbies}</p>
      </div>
    </div>
  );
}

export default HomePage;
