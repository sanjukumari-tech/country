const express = require('express');
const connectToDb = require('./configs/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 9000;
const db_url = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the home route');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/countries', require('./routes/countryRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));

app.listen(port, async () => {
  try {
    await connectToDb(db_url);
    console.log('Connected to the Database');
    console.log(`Server is running at the port http://localhost/${port}`);
  } catch (error) {
    console.error(error);
  }
});
