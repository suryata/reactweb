import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BuyBoat from './buyBoat';
import EditBoat from './EditBoat';
import ColorsModal from './ColorsModal';
import './App.css';
import './Modal.css';

function App() {
  const [boats, setBoats] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editableBoat, setEditableBoat] = useState(null);
  const [showColorsModal, setShowColorsModal] = useState(false);
  const [boatColors, setBoatColors] = useState([]);

  const fetchBoatColors = async () => {
    try {
      const response = await fetch('https://oprec-betis-be.up.railway.app/perahu/warna', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzFiN2MzYi1lYjc2LTQ0NTgtYTliOS02MzZiZWM2NDg1NmIiLCJpZCI6IjljMWI3YzNiLWViNzYtNDQ1OC1hOWI5LTYzNmJlYzY0ODU2YiIsInVzZXJuYW1lIjoic3VyeWF0YSIsImlhdCI6MTcwMzQyNjQzOSwiZXhwIjoxNzA2MDE4NDM5fQ.WJz3d1L6_mA2pcgGu4A4Xr-jQsLll9p53xryQXl1C5c'}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBoatColors(data.daftarWarna);
    } catch (error) {
      console.error("Could not fetch the boat colors:", error);
    }
  };

  const toggleColorsModal = () => {
    setShowColorsModal(!showColorsModal);
    if (!showColorsModal) {
      fetchBoatColors();
    }
  };

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

  useEffect(() => {
    fetchBoats();
  }, []);

  const deleteBoat = async (id) => {
    try {
      await fetch(`https://oprec-betis-be.up.railway.app/perahu/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzFiN2MzYi1lYjc2LTQ0NTgtYTliOS02MzZiZWM2NDg1NmIiLCJpZCI6IjljMWI3YzNiLWViNzYtNDQ1OC1hOWI5LTYzNmJlYzY0ODU2YiIsInVzZXJuYW1lIjoic3VyeWF0YSIsImlhdCI6MTcwMzQyNjQzOSwiZXhwIjoxNzA2MDE4NDM5fQ.WJz3d1L6_mA2pcgGu4A4Xr-jQsLll9p53xryQXl1C5c'}`
        }
      });
      fetchBoats();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const toggleEditModal = (boat = null) => {
    setEditableBoat(boat);
    setShowEditModal(!showEditModal);
  };

  const handleBoatSubmit = () => {
    toggleAddModal();
    fetchBoats();
  };

  const handleBoatEdit = () => {
    toggleEditModal();
    fetchBoats();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: 'center' }}>Daftar Perahu</h1>
        <button onClick={toggleAddModal} className="button add-boat-button">Add Boat</button>
        <button onClick={toggleColorsModal} className="button show-colors-button">Show Colors</button>
        <div className="boat-cards">
          {boats.map((boat) => (
            <div key={boat.id} className="card">
              <h2>{boat.name}</h2>
              <p>Desc: {boat.description}</p>
              <p>Capacity: {boat.capacity}</p>
              <p>Color: {boat.color}</p>
              <p>Is Sailing: {boat.is_sailing ? 'Yes' : 'No'}</p>
              <Link to={`/detail/${boat.id}`} className="button detail-button">Detail</Link>
              <button onClick={() => deleteBoat(boat.id)} className="button delete-button">Delete</button>
              <button onClick={() => toggleEditModal(boat)} className="button edit-button">Edit</button>
            </div>
          ))}
        </div>
      </header>
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleAddModal}>&times;</span>
            <BuyBoat closeModal={handleBoatSubmit} />
          </div>
        </div>
      )}
      {showEditModal && editableBoat && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => toggleEditModal()}>&times;</span>
            <EditBoat boat={editableBoat} closeModal={handleBoatEdit} />
          </div>
        </div>
      )}
      {showColorsModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleColorsModal}>&times;</span>
            <ColorsModal boatColors={boatColors} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
