require('dotenv').config();

const express = require('express');
const eventRoutes = require('./routes/eventRoutes');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Routes
app.use(express.json());
app.use(express.static('public'));
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
