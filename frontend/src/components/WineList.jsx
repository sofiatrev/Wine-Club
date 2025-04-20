import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WineList = () => {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all wines from the backend
    const fetchWines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/wines');
        setWines(response.data);
      } catch (error) {
        console.error('Error fetching wines:', error);
        setError('Failed to load wines');
      }
    };

    fetchWines();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <div>
      <h2>All Wines</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {wines.map((wine) => (
          <li key={wine.id}>
            <strong>{wine.name}</strong> from {wine.winery} ({wine.year})
            <p>Rating: {wine.rating} | Notes: {wine.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WineList;
