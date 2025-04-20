// src/components/WineForm.jsx
import React, { useState } from 'react';

const WineForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    vintage: '',
    rating: '',
    notes: '',
    region: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send the form data to the backend
    console.log('Wine data submitted:', formData);
    // Clear the form after submission
    setFormData({
      name: '',
      type: '',
      vintage: '',
      rating: '',
      notes: '',
      region: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="wine-form">
      <h2>Log a Wine</h2>
      <label>
        Wine Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Wine Type:
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Rosé">Rosé</option>
          <option value="Sparkling">Sparkling</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>
      <label>
        Vintage (Year):
        <input
          type="number"
          name="vintage"
          value={formData.vintage}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Rating (1-10):
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
          min="1"
          max="10"
        />
      </label>
      <label>
        Tasting Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Wine Region:
        <input
          type="text"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Log Wine</button>
    </form>
  );
};

export default WineForm;
