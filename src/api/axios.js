import axios from 'axios';

const accessToken = localStorage.getItem('access-token');

export default axios.create({
  baseURL: 'http://localhost:3030/api',
  headers: { 'access-token': accessToken }
});
