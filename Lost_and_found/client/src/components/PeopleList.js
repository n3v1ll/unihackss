import React, { useEffect, useState } from "react";

function PeopleList() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5001/api/people");  // ✅ Use correct URL

      console.log("Response Status:", response.status);  // ✅ Debugging status code

      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error("Error fetching people:", error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>People in the Database</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}  {/* ✅ Show error details */}
      <ul>
        {people.map((person) => (
          <li key={person._id}>  {/* ✅ Use `_id` instead of `id` */}
            <img 
              src={`http://127.0.0.1:5001/static/uploads/${person.photo}`}  // ✅ Fix image path
              alt="Profile"
              width="100"
            />
            <p><strong>LinkedIn:</strong> <a href={person.linkedin_url} target="_blank" rel="noopener noreferrer">{person.linkedin_url}</a></p>
            <p><strong>Summary:</strong> {person.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PeopleList;
