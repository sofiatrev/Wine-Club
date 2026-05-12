import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Root health endpoint
app.get('/', (_req, res) => {
  res.send('Wine Club API is running \uD83C\uDF77');
});

// In-memory store (MVP). Fields: id, name, country, year, type, rating (0-10), notes
let wines = [
  {
    id: 1,
    name: 'Chardonnay',
    country: 'France',
    year: 2021,
    type: 'White',
    rating: 8,
    notes: 'Crisp and citrus-forward with a buttery finish.',
  },
  {
    id: 2,
    name: 'Merlot',
    country: 'USA',
    year: 2019,
    type: 'Red',
    rating: 7,
    notes: 'Smooth tannins and dark cherry notes.',
  },
];

// Helper validation
function validateWine(payload) {
  const errors = [];
  const { name, country, year, type, rating, notes } = payload;
  const allowedTypes = ['Red', 'White', 'Rose', 'Sparkling'];
  if (!name) errors.push('name required');
  if (!country) errors.push('country required');
  const currentYear = new Date().getFullYear();
  if (year === undefined || year === null || Number.isNaN(Number(year))) errors.push('year required');
  else if (year < 1900 || year > currentYear) errors.push('year out of range');
  if (!type || !allowedTypes.includes(type)) errors.push('invalid type');
  if (rating === undefined || rating === null || Number.isNaN(Number(rating))) errors.push('rating required');
  else if (rating < 1 || rating > 10) errors.push('rating must be 1-10');
  if (notes !== undefined && notes !== null) {
    if (typeof notes !== 'string') errors.push('notes must be a string');
    else if (notes.length > 500) errors.push('notes must be 500 characters or less');
  }
  return errors;
}

// Routes
app.get('/wines', (_req, res) => {
  res.json(wines);
});

app.post('/wines', (req, res) => {
  const errors = validateWine(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const { name, country, year, type, rating, notes } = req.body;
  const newWine = {
    id: wines.length ? wines[wines.length - 1].id + 1 : 1,
    name,
    country,
    year: Number(year),
    type,
    rating: Number(rating),
    notes: typeof notes === 'string' ? notes.trim() : '',
  };
  wines.push(newWine);
  res.status(201).json(newWine);
});

app.get('/wines/:id', (req, res) => {
  const wine = wines.find(w => w.id === Number(req.params.id));
  if (!wine) return res.status(404).json({ error: 'Not found' });
  res.json(wine);
});

app.put('/wines/:id', (req, res) => {
  const wine = wines.find(w => w.id === Number(req.params.id));
  if (!wine) return res.status(404).json({ error: 'Not found' });
  const update = { ...wine, ...req.body };
  const errors = validateWine(update);
  if (errors.length) return res.status(400).json({ errors });
  wine.name = update.name;
  wine.country = update.country;
  wine.year = Number(update.year);
  wine.type = update.type;
  wine.rating = Number(update.rating);
  wine.notes = typeof update.notes === 'string' ? update.notes.trim() : '';
  res.json(wine);
});

app.delete('/wines/:id', (req, res) => {
  const idx = wines.findIndex(w => w.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  wines.splice(idx, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
