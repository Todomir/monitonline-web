import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

api.interceptors.request.use(
  config => {
    // Do something before request is sent

    config.headers.Authorization = `bearer ${getToken()}`;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default api;
