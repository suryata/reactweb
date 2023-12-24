import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BuyBoat from './buyBoat'; 
import Detail from './Detail'; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/buy" element={<BuyBoat />} />
        <Route path="/detail/:idPerahu" element={<Detail />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
