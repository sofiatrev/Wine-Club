// src/components/WineForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const allowedTypes = ['Red', 'White', 'Rose', 'Sparkling'];

const WineForm = ({ onAdded }) => {
  const [form, setForm] = useState({
    name: '',
    country: '',
    year: '',
    type: '',
    rating: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const { name, country, year, type, rating } = form;
    if (!name || !country || !year || !type || rating === '') {
      setError('All fields required');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/wines', {
        name,
        country,
        year: Number(year),
        type,
        rating: Number(rating),
      });
      setForm({ name: '', country: '', year: '', type: '', rating: '' });
      onAdded && onAdded(res.data);
    } catch (err) {
      setError(err.response?.data?.errors?.join(', ') || 'Failed to save');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="wine-form">
      <h2>Log a Wine</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Country
        <input name="country" value={form.country} onChange={handleChange} required />
      </label>
      <label>
        Year
        <input type="number" name="year" value={form.year} onChange={handleChange} min="1900" max={new Date().getFullYear()} required />
      </label>
      <label>
        Type
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select</option>
          {allowedTypes.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Rating (1-10)
        <input type="number" name="rating" value={form.rating} onChange={handleChange} min="1" max="10" required />
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Wine'}</button>
    </form>
  );
};

export default WineForm;
