import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://habit-tracker-serverside.vercel.app/',
});

export default axiosInstance;
