import React, { useEffect, useState } from "react";

function ProfileList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5001/api/profiles");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  return (
    <div>
      <h2>People in the Database</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <h3>{profile.name}</h3>
            <p><strong>Education:</strong> {profile.education}</p>
            <p><strong>Skills:</strong> {profile.skills}</p>
            <p><strong>Interests:</strong> {profile.interests}</p>
            <p><strong>Hobbies:</strong> {profile.hobbies}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileList;
