import React, { useState } from "react";

function ProfilePrompt({ onProfileAdded }) {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("linkedin_url", linkedinUrl);
    if (photo) formData.append("photo", photo);

    try {
      const response = await fetch("http://127.0.0.1:5001/api/add-person", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Profile added successfully!");
        setLinkedinUrl(""); // Reset input fields
        setPhoto(null);
        onProfileAdded(); // Refresh people list
      } else {
        alert("Error adding profile");
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  return (
    <div className="modal">
      <h2>Add Your LinkedIn Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>LinkedIn URL:</label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form> 
    </div>  // ✅ Ensuring this div closes properly
  );
}

export default ProfilePrompt;
