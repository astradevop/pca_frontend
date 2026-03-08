import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.116.247.84:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// In-memory token storage (works for web + native)
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => authToken;

// --- Auth ---
export const loginUser = async (username, password) => {
  const response = await api.post('/token/', { username, password });
  return response.data; // { access, refresh }
};

// --- Customers ---
export const getCustomers = async () => {
  const response = await api.get('/customers/');
  return response.data;
};

export const addCustomer = async (customerData) => {
  const response = await api.post('/customers/', customerData);
  return response.data;
};

// --- Payments ---
export const getPaymentHistory = async (accountNumber) => {
  const response = await api.get(`/payments/${accountNumber}/`);
  return response.data;
};

export const makePayment = async (paymentData) => {
  const response = await api.post('/payments/', paymentData);
  return response.data;
};

export default api;
