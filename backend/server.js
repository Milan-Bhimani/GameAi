const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ai', require('./routes/ai'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 GameAI Server running on port ${PORT}`);
  console.log(`🤖 AI-powered game discovery ready!`);
});