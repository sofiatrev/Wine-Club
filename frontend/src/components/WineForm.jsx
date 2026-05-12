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
    notes: '',
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
    const { name, country, year, type, rating, notes } = form;
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
        notes,
      });
      setForm({ name: '', country: '', year: '', type: '', rating: '', notes: '' });
      onAdded && onAdded(res.data);
    } catch (err) {
      setError(err.response?.data?.errors?.join(', ') || 'Failed to save');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="wine-form">
      <h2 className="form-title">Log a New Wine</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Wine Name</label>
          <input 
            className="form-input"
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="e.g. Château Margaux"
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Country</label>
          <input 
            className="form-input"
            name="country" 
            value={form.country} 
            onChange={handleChange} 
            placeholder="e.g. France"
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Year</label>
          <input 
            className="form-input"
            type="number" 
            name="year" 
            value={form.year} 
            onChange={handleChange} 
            min="1900" 
            max={new Date().getFullYear()} 
            placeholder="e.g. 2020"
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Type</label>
          <select className="form-select" name="type" value={form.type} onChange={handleChange} required>
            <option value="">Select wine type</option>
            {allowedTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Rating (1-10)</label>
          <input 
            className="form-input"
            type="number" 
            name="rating" 
            value={form.rating} 
            onChange={handleChange} 
            min="1" 
            max="10" 
            placeholder="Rate 1-10"
            required 
          />
        </div>

        <div className="form-group form-group-full-width">
          <label className="form-label" htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            className="form-input form-textarea"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            maxLength={500}
            placeholder="Add tasting notes, pairing ideas, or anything memorable..."
            rows={4}
          />
          <div className="char-counter">{form.notes.length}/500</div>
        </div>
      </div>
      
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add Wine'}
      </button>
    </form>
  );
};

export default WineForm;
