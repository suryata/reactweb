import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const [boat, setBoat] = useState(null);
  const { idPerahu } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoatDetail = async () => {
      try {
        const response = await fetch(`https://oprec-betis-be.up.railway.app/perahu/${idPerahu}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YzFiN2MzYi1lYjc2LTQ0NTgtYTliOS02MzZiZWM2NDg1NmIiLCJpZCI6IjljMWI3YzNiLWViNzYtNDQ1OC1hOWI5LTYzNmJlYzY0ODU2YiIsInVzZXJuYW1lIjoic3VyeWF0YSIsImlhdCI6MTcwMzQyNjQzOSwiZXhwIjoxNzA2MDE4NDM5fQ.WJz3d1L6_mA2pcgGu4A4Xr-jQsLll9p53xryQXl1C5c'}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBoat(data.perahu);
      } catch (error) {
        console.error("Could not fetch the boat detail:", error);
      }
    };
    fetchBoatDetail();
  }, [idPerahu]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="detail-container">
      {boat ? (
        <div className="boat-detail-card">
          <h2>{boat.name}</h2>
          <div className="detail-field"><strong>ID:</strong> {boat.id}</div>
          <div className="detail-field"><strong>Bought At:</strong> {new Date(boat.bought_at).toLocaleString()}</div>
          <div className="detail-field"><strong>Last Updated:</strong> {new Date(boat.updated_at).toLocaleString()}</div>
          <div className="detail-field"><strong>Description:</strong> {boat.description}</div>
          <div className="detail-field"><strong>Capacity:</strong> {boat.capacity}</div>
          <div className="detail-field"><strong>Color:</strong> {boat.color}</div>
          <div className="detail-field"><strong>Is Sailing:</strong> {boat.is_sailing ? 'Yes' : 'No'}</div>
          <button onClick={handleBack} className="back-button">Back</button>
        </div>
      ) : (
        <p>Loading boat details...</p>
      )}
    </div>
  );
};

export default Detail;
