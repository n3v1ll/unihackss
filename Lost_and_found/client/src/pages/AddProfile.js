import React, { useState } from "react";

function AddProfile() {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    skills: "",
    interests: "",
    hobbies: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5001/api/add-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => console.error("Error adding profile:", err));
  };

  return (
    <div>
      <h2>Add Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="education" placeholder="Education" onChange={handleChange} />
        <input name="skills" placeholder="Skills" onChange={handleChange} />
        <input name="interests" placeholder="Interests" onChange={handleChange} />
        <input name="hobbies" placeholder="Hobbies" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProfile;
