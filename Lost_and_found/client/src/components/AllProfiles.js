import React, { useEffect, useState } from "react";

function AllProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/profiles")
      .then((response) => response.json())
      .then((data) => setProfiles(data))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>All Profiles</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div key={profile._id} style={{ border: "1px solid #ddd", padding: "20px", margin: "10px", borderRadius: "8px", width: "300px", textAlign: "left" }}>
              <h3>{profile.name}</h3>
              <p><strong>Education:</strong> {profile.education}</p>
              <p><strong>Skills:</strong> {profile.skills}</p>
              <p><strong>Interests:</strong> {profile.interests}</p>
              <p><strong>Hobbies:</strong> {profile.hobbies}</p>
            </div>
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </div>
    </div>
  );
}

export default AllProfiles;
