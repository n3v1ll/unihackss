import React, { useEffect, useState } from "react";

function ProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/profiles") // ✅ Fetch profiles from backend
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading profiles...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Profiles</h2>
      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {profiles.map((profile) => (
            <div key={profile._id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
              <h3>{profile.name}</h3>
              <p><strong>Education:</strong> {profile.education}</p>
              <p><strong>Skills:</strong> {profile.skills}</p>
              <p><strong>Interests:</strong> {profile.interests}</p>
              <p><strong>Hobbies:</strong> {profile.hobbies}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilesList;
