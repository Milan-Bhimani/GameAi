const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🎮 GameAI Backend API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/ai', require('./routes/ai'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 GameAI Server running on port ${PORT}`);
  console.log(`🤖 AI-powered game discovery ready!`);
});