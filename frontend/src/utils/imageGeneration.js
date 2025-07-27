import axios from 'axios';
import { axiosConfig } from '../config/api';

// Generate AI-powered game images on the frontend
export const generateGameImage = async (gameTitle, genre, description, style = 'realistic') => {
  try {
    const response = await axios.post('/api/ai/generate-game-image', {
      gameTitle,
      genre,
      description,
      style
    }, axiosConfig);
    
    return response.data;
  } catch (error) {
    console.error('Failed to generate AI image:', error);
    return null;
  }
};

// Preload images to improve performance
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Generate fallback image if main image fails
export const generateFallbackImage = (title, genre) => {
  const colors = {
    'Action': ['#ff4444', '#cc0000'],
    'RPG': ['#8b4513', '#daa520'],
    'Horror': ['#2c1810', '#8b0000'],
    'Racing': ['#ff6600', '#ffcc00'],
    'Strategy': ['#4682b4', '#1e90ff'],
    'Simulation': ['#228b22', '#32cd32'],
    'Platformer': ['#ff69b4', '#ffd700'],
    'Shooter': ['#696969', '#a9a9a9'],
    'Puzzle': ['#9370db', '#ba55d3'],
    'Sports': ['#00ced1', '#20b2aa']
  };
  
  let colorScheme = ['#1a73e8', '#4285f4'];
  Object.keys(colors).forEach(key => {
    if (genre.toLowerCase().includes(key.toLowerCase())) {
      colorScheme = colors[key];
    }
  });
  
  const randomId = Math.random().toString(36).substring(2, 9);
  
  const svg = `<svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad${randomId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colorScheme[0]};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colorScheme[1]};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad${randomId})"/>
    <text x="50%" y="50%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="700">
      ${title}
    </text>
    <text x="50%" y="60%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" opacity="0.8">
      ${genre}
    </text>
  </svg>`;
  
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
};

// Smart image loader with fallbacks
export const loadGameImage = async (game) => {
  const { title, genre, description, coverImage } = game;
  
  // Try original image first
  if (coverImage) {
    try {
      await preloadImage(coverImage);
      return coverImage;
    } catch (error) {
      console.log(`Failed to load original image for ${title}, trying AI generation...`);
    }
  }
  
  // Try AI-generated image
  try {
    const aiImages = await generateGameImage(title, genre, description);
    if (aiImages && aiImages.unsplash) {
      await preloadImage(aiImages.unsplash);
      return aiImages.unsplash;
    }
  } catch (error) {
    console.log(`AI image generation failed for ${title}, using fallback...`);
  }
  
  // Use fallback
  return generateFallbackImage(title, genre);
};