import axios from 'axios';
import API_URLS from './apiConfig';

const userApi = axios.create({
  baseURL: API_URLS.user,
  timeout: 5000,
});

export default userApi;