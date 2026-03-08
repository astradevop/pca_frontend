import axios from 'axios';
import { Platform } from 'react-native';

// Since you are using a physical phone, it must connect to your computer's local Wi-Fi IP.
// 10.0.2.2 is only for the screen Emulator!
// Use environment variable for the API URL as requested in the requirements
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.116.247.84:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCustomers = async () => {
  const response = await api.get('/customers/');
  return response.data;
};

export const getPaymentHistory = async (accountNumber) => {
  const response = await api.get(`/payments/${accountNumber}/`);
  return response.data;
};

export const makePayment = async (paymentData) => {
  const response = await api.post('/payments/', paymentData);
  return response.data;
};

export default api;
