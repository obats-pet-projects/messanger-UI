const getAccessToken = () => {
  return localStorage.getItem('access-token');
};

export default getAccessToken;
