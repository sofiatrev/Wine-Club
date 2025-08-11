import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WineList = ({ refreshSignal }) => {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/wines');
      setWines(res.data);
    } catch (e) {
      setError('Failed to load wines');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [refreshSignal]);

  return (
    <div>
      <h2>All Wines</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {wines.map(w => (
          <li key={w.id}>
            <strong>{w.name}</strong> ({w.year}) – {w.type} – {w.country} – Rating: {w.rating}
          </li>
        ))}
      </ul>
      {!wines.length && !loading && <p>No wines logged yet.</p>}
    </div>
  );
};

export default WineList;
