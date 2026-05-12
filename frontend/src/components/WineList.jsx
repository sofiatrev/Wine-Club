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
    <div className="wine-list-container">
      <h2 className="wine-list-title">Your Wine Collection</h2>
      
      {loading && <p className="loading-message">Loading your wines...</p>}
      {error && <div className="error-message">{error}</div>}
      
      {!wines.length && !loading && (
        <p className="empty-message">No wines logged yet. Add your first wine above!</p>
      )}
      
      <div className="wine-grid">
        {wines.map(w => (
          <div key={w.id} className="wine-card">
            <div className="wine-name">{w.name}</div>
            <div className="wine-details">
              <div className="wine-detail">
                <span>Year:</span>
                <span>{w.year}</span>
              </div>
              <div className="wine-detail">
                <span>Type:</span>
                <span>{w.type}</span>
              </div>
              <div className="wine-detail">
                <span>Country:</span>
                <span>{w.country}</span>
              </div>
            </div>
            <div className="wine-rating">
              <span className="rating-label">Rating:</span>
              <span className="rating-value">{w.rating}/10</span>
            </div>
            {w.notes && (
              <div className="wine-notes">
                <span className="notes-label">Notes:</span>
                <p className="notes-text">{w.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineList;
