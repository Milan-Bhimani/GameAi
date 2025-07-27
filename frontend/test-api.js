// Simple test to verify API connection
const API_URL = 'https://gameai-mh5p.onrender.com';

async function testAPI() {
  console.log('🧪 Testing API connection...');
  console.log(`📡 API URL: ${API_URL}`);
  
  try {
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_URL}/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check passed:', healthData.status);
    } else {
      console.log('❌ Health check failed:', healthResponse.status);
    }
    
    // Test main endpoint
    console.log('\n2. Testing main endpoint...');
    const mainResponse = await fetch(`${API_URL}/`);
    if (mainResponse.ok) {
      const mainData = await mainResponse.json();
      console.log('✅ Main endpoint working:', mainData.message);
    } else {
      console.log('❌ Main endpoint failed:', mainResponse.status);
    }
    
    // Test popular games endpoint
    console.log('\n3. Testing popular games endpoint...');
    const gamesResponse = await fetch(`${API_URL}/api/ai/popular-games`);
    if (gamesResponse.ok) {
      const gamesData = await gamesResponse.json();
      console.log('✅ Games endpoint working:', gamesData.games ? `${gamesData.games.length} games` : 'No games');
    } else {
      console.log('❌ Games endpoint failed:', gamesResponse.status);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run in browser console or Node.js
if (typeof window !== 'undefined') {
  // Browser environment
  testAPI();
} else {
  // Node.js environment
  const fetch = require('node-fetch');
  testAPI();
}