import React, { useState } from 'react';
import axios from 'axios';

const WineForm = () => {
  // State to manage form data
  const [name, setName] = useState('');
  const [winery, setWinery] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!name || !winery || !year || !rating || !notes) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send data to backend using Axios
      const response = await axios.post('http://localhost:5000/wines', {
        name,
        winery,
        year,
        rating,
        notes,
      });
      console.log('Wine added:', response.data);
      // Reset the form
      setName('');
      setWinery('');
      setYear('');
      setRating('');
      setNotes('');
      setError('');
    } catch (error) {
      console.error('Error adding wine:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add a New Wine</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Wine Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Winery:</label>
          <input type="text" value={winery} onChange={(e) => setWinery(e.target.value)} />
        </div>
        <div>
          <label>Year:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        <div>
          <label>Notes:</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WineForm;
