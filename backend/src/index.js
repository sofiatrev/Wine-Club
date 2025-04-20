import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware to parse JSON data in requests
app.use(express.json());  // This should come before your routes

app.use(cors());  // You can keep CORS middleware after

// Root endpoint to check if API is running
app.get('/', (req, res) => {
  res.send('Wine Club API is running 🍷');
});

// Dummy data to simulate a database
let wines = [
  { id: 1, name: 'Chardonnay', winery: 'ABC Winery', year: 2021, rating: 4.5, notes: 'Fruity and smooth' },
  { id: 2, name: 'Merlot', winery: 'XYZ Vineyards', year: 2019, rating: 4.0, notes: 'Rich and full-bodied' },
];

// Routes
// Get all wines
app.get('/wines', (req, res) => {
  res.json(wines);
});

// Add a new wine
app.post('/wines', (req, res) => {
  const { name, winery, year, rating, notes } = req.body;
  const newWine = {
    id: wines.length + 1,  // Simple ID generation
    name,
    winery,
    year,
    rating,
    notes,
  };
  wines.push(newWine);
  res.status(201).json(newWine);
});

// Get a specific wine by ID
app.get('/wines/:id', (req, res) => {
  const wine = wines.find(wine => wine.id === parseInt(req.params.id));
  if (!wine) return res.status(404).send('Wine not found');
  res.json(wine);
});

// Update a wine
app.put('/wines/:id', (req, res) => {
  const wine = wines.find(wine => wine.id === parseInt(req.params.id));
  if (!wine) return res.status(404).send('Wine not found');

  const { name, winery, year, rating, notes } = req.body;
  wine.name = name || wine.name;
  wine.winery = winery || wine.winery;
  wine.year = year || wine.year;
  wine.rating = rating || wine.rating;
  wine.notes = notes || wine.notes;

  res.json(wine);
});

// Delete a wine
app.delete('/wines/:id', (req, res) => {
  const wineIndex = wines.findIndex(wine => wine.id === parseInt(req.params.id));
  if (wineIndex === -1) return res.status(404).send('Wine not found');

  wines.splice(wineIndex, 1);  // Remove the wine from the array
  res.status(204).send();  // No content
});


const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not found

// Start server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
