import axios from 'axios';

const baseURL = 'http://localhost:3030/api';
let token;

export const httpService = () => {
  token = token || localStorage.getItem('access-token');
  return axios.create({
    baseURL,
    headers: { 'access-token': token }
  });
};
