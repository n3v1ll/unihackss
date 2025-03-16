import React, { useEffect, useState } from "react";

function AllProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/profiles")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProfiles(data);
        }
      })
      .catch((err) => setError("Failed to fetch profiles"));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>All Profiles</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div key={profile._id} style={{ border: "1px solid black", padding: "10px", width: "300px" }}>
              <h3>{profile.name}</h3>
              <p><strong>Education:</strong> {profile.education}</p>
              <p><strong>Skills:</strong> {profile.skills}</p>
              <p><strong>Interests:</strong> {profile.interests}</p>
              <p><strong>Hobbies:</strong> {profile.hobbies}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No profiles found.</p>
        )}
      </div>
    </div>
  );
}

export default AllProfiles;
