// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000',
  },
  production: {
    baseURL: import.meta.env.VITE_API_URL || 'https://your-render-backend-url.onrender.com',
  }
};

const environment = import.meta.env.MODE || 'development';
export const API_BASE_URL = API_CONFIG[environment].baseURL;

// Default axios configuration
export const axiosConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for AI requests
  headers: {
    'Content-Type': 'application/json',
  },
};

console.log(`🔗 API Base URL: ${API_BASE_URL} (${environment})`);