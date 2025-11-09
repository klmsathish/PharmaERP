import axios from 'axios';

// Platform detection
export const isElectron = () => {
  return !!(window as any).electron;
};

export const isTauri = () => {
  return !!(window as any).__TAURI__;
};

export const isWeb = () => {
  return !isElectron() && !isTauri();
};

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Services
export const productAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/products?skip=${skip}&limit=${limit}`),
  getById: (id: number) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: number, data: any) => api.put(`/products/${id}`, data),
  delete: (id: number) => api.delete(`/products/${id}`),
};

export const productTypeAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/product-types?skip=${skip}&limit=${limit}`),
  getById: (id: number) => api.get(`/product-types/${id}`),
  create: (data: any) => api.post('/product-types', data),
  update: (id: number, data: any) => api.put(`/product-types/${id}`, data),
  delete: (id: number) => api.delete(`/product-types/${id}`),
};

export const productCategoryAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/product-categories?skip=${skip}&limit=${limit}`),
  getById: (id: number) => api.get(`/product-categories/${id}`),
  create: (data: any) => api.post('/product-categories', data),
  update: (id: number, data: any) => api.put(`/product-categories/${id}`, data),
  delete: (id: number) => api.delete(`/product-categories/${id}`),
};

export const manufacturerAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/manufacturers?skip=${skip}&limit=${limit}`),
  getById: (id: number) => api.get(`/manufacturers/${id}`),
  create: (data: any) => api.post('/manufacturers', data),
  update: (id: number, data: any) => api.put(`/manufacturers/${id}`, data),
  delete: (id: number) => api.delete(`/manufacturers/${id}`),
};

export const taxAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/taxes?skip=${skip}&limit=${limit}`),
  getById: (id: number) => api.get(`/taxes/${id}`),
  create: (data: any) => api.post('/taxes', data),
  update: (id: number, data: any) => api.put(`/taxes/${id}`, data),
  delete: (id: number) => api.delete(`/taxes/${id}`),
};

export const scheduleTypeAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/schedule-types?skip=${skip}&limit=${limit}`),
  getById: (id: number) => api.get(`/schedule-types/${id}`),
  create: (data: any) => api.post('/schedule-types', data),
  update: (id: number, data: any) => api.put(`/schedule-types/${id}`, data),
  delete: (id: number) => api.delete(`/schedule-types/${id}`),
};

export const genericAPI = {
  getAll: (skip = 0, limit = 100) => api.get(`/generics?skip=${skip}&limit=${limit}`),
  getById: (id: number) => api.get(`/generics/${id}`),
  create: (data: any) => api.post('/generics', data),
  update: (id: number, data: any) => api.put(`/generics/${id}`, data),
  delete: (id: number) => api.delete(`/generics/${id}`),
};

export default api;
