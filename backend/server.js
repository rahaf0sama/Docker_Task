require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

const mealSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
}, { collection: 'meals' });

const Meal = mongoose.model('Meal', mealSchema);

app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

app.get('/api/meals', async (req, res) => {
  try {
    const meals = await Meal.find({});
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching meals', error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));