import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const API = {
  getComparision: () => api.get('/comparision'),
  getWeeklyData: () => api.get('/weekly-chart'),
  getMonthlyData: () => api.get('/monthly-chart'),
  getSessionWeights: () => api.get('/weights'),
  getMonthlyWaste: () => api.get('/monthly-waste'),
  getDailyWaste: () => api.get('/comparision'), // Get today's data from comparison endpoint
};

export default api;
