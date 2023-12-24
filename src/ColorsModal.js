import React from 'react';

function ColorsModal({ boatColors }) {
  return (
    <div>
      <h2>Colors of Boats</h2>
      <ul>
        {boatColors.map((color, index) => (
          <li key={index} style={{ color }}>
            {color}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ColorsModal;
