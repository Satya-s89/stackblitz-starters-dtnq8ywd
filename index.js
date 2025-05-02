// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const { resolve } = require('path');
const connectDB = require('./db/connection');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3010;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

// Request logging middleware
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if ((req.method === 'POST' || req.method === 'PUT') && req.body) {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Routes
app.get('/', (_, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// API Routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error('Error details:', err);
  console.error('Error stack:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
