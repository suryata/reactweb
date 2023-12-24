import React, { useState } from 'react';

const colors = [
 "RED",
 "ORANGE",
 "YELLOW",
 "GREEN",
 "BLUE",
 "INDIGO",
 "VIOLET",
 "WHITE",
 "BLACK"
];

const BuyBoat = ({ closeModal }) => {
  const [boatData, setBoatData] = useState({
    name: '',
    description: '',
    capacity: 0,
    color: colors[0], 
    is_sailing: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBoatData(prevState => ({
      ...prevState,
      [name]: name === 'capacity' ? parseInt(value, 10) : value
    }));
  };

  const handleCheckboxChange = (e) => {
    setBoatData(prevState => ({
      ...prevState,
      is_sailing: e.target.checked
    }));
  };

  const submitBoatData = async () => {
    try {
      const response = await fetch('https://oprec-betis-be.up.railway.app/perahu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzFiN2MzYi1lYjc2LTQ0NTgtYTliOS02MzZiZWM2NDg1NmIiLCJpZCI6IjljMWI3YzNiLWViNzYtNDQ1OC1hOWI5LTYzNmJlYzY0ODU2YiIsInVzZXJuYW1lIjoic3VyeWF0YSIsImlhdCI6MTcwMzQyNjQzOSwiZXhwIjoxNzA2MDE4NDM5fQ.WJz3d1L6_mA2pcgGu4A4Xr-jQsLll9p53xryQXl1C5c'}`
        },
        body: JSON.stringify(boatData)
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Error when making a POST request');
      }

      // If post is successful, log the response and close the modal
      const responseData = await response.json();
      console.log('Success:', responseData);
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Buy a Boat</h2>
      <label>
        Boat Name:
        <input
          type="text"
          name="name"
          value={boatData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={boatData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Capacity:
        <input
          type="number"
          name="capacity"
          value={boatData.capacity}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Color:
        <select
          name="color"
          value={boatData.color}
          onChange={handleInputChange}
        >
          {colors.map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </label>
      <label>
        Is Sailing:
        <input
          type="checkbox"
          name="is_sailing"
          checked={boatData.is_sailing}
          onChange={handleCheckboxChange}
        />
      </label>
      <button onClick={submitBoatData}>Submit</button>
    </div>
  );
};

export default BuyBoat;
