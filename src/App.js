import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BuyBoat from './buyBoat'; 
import './App.css';
import './Modal.css'; 

function App() {
  const [boats, setBoats] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBoats();
  }, []);

  const fetchBoats = async () => {
    try {
      const response = await fetch('https://oprec-betis-be.up.railway.app/perahu', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzFiN2MzYi1lYjc2LTQ0NTgtYTliOS02MzZiZWM2NDg1NmIiLCJpZCI6IjljMWI3YzNiLWViNzYtNDQ1OC1hOWI5LTYzNmJlYzY0ODU2YiIsInVzZXJuYW1lIjoic3VyeWF0YSIsImlhdCI6MTcwMzQyNjQzOSwiZXhwIjoxNzA2MDE4NDM5fQ.WJz3d1L6_mA2pcgGu4A4Xr-jQsLll9p53xryQXl1C5c'}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBoats(data.daftarPerahu);
    } catch (error) {
      console.error("Could not fetch the boats:", error);
    }
  };

  const deleteBoat = async (id) => {
    try {
      const response = await fetch(`https://oprec-betis-be.up.railway.app/perahu/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzFiN2MzYi1lYjc2LTQ0NTgtYTliOS02MzZiZWM2NDg1NmIiLCJpZCI6IjljMWI3YzNiLWViNzYtNDQ1OC1hOWI5LTYzNmJlYzY0ODU2YiIsInVzZXJuYW1lIjoic3VyeWF0YSIsImlhdCI6MTcwMzQyNjQzOSwiZXhwIjoxNzA2MDE4NDM5fQ.WJz3d1L6_mA2pcgGu4A4Xr-jQsLll9p53xryQXl1C5c'}`
        }
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Error when making a DELETE request');
      }

      await fetchBoats();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleBoatSubmit = () => {
    toggleModal();
    fetchBoats();
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1 style={{ textAlign: 'center' }}>Daftar Perahu</h1>
        <button onClick={toggleModal} className="button add-boat-button">Add Boat</button>
        <div className="boat-cards">
          {boats.length > 0 ? (
            boats.map((boat) => (
              <div key={boat.id} className="card">
                <h2>{boat.name}</h2>
                <p>Desc: {boat.description}</p>
                <p>Capacity: {boat.capacity}</p>
                <p>Color: {boat.color}</p>
                <p>Is Sailing: {boat.is_sailing ? 'Yes' : 'No'}</p>
                <Link to={`/detail/${boat.id}`} className="button detail-button">
                  Detail
                </Link>
                <button onClick={() => deleteBoat(boat.id)} className="button delete-button">
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>Loading boats...</p>
          )}
        </div>
      </header>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>&times;</span>
            <BuyBoat closeModal={handleBoatSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
