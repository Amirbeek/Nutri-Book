import React, { useState } from "react";

function App() {
  const [userData, setUserData] = useState([]);

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/api");
      const data = await response.json();
      setUserData(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Recipe details</h1>
      <img
        src="http://localhost:5000/images/food.jpg" 
        alt="User 1"
        onClick={handleClick}
        style={{ cursor: "pointer", maxWidth: "100%" }}
      />
      <div>
        {userData.map((user, index) => (
          <p key={index}>{user}</p>
        ))}
      </div>
    </div>
  );
}

export default App;


