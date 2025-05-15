import axios from 'axios';
import { apiUrl } from './GlobalConstants';

const axiosAPI = axios.create({
  baseURL: apiUrl,
});

axiosAPI.defaults.withCredentials = true;

export default axiosAPI;
