import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getProduct = (id) => api.get(`/products/${id}`);
export const getColors = () => api.get('/colors');
export const getSizes = () => api.get('/sizes');

export default api;