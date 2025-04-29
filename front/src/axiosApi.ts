import axios from 'axios';
import { apiUrl } from './GlobalConstants';

const axiosAPI = axios.create({
  baseURL: apiUrl,
});

export default axiosAPI;
