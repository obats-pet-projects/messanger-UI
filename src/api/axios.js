import axios from 'axios';

let token;

export const httpService = () => {
  token = token || localStorage.getItem('access-token');
  return axios.create({
    baseURL: 'http://localhost:3030/api',
    headers: { 'access-token': token }
  });
};
