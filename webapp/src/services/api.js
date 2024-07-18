import axios from 'axios';

const apiKey = 'a1d50d4ff753189e5724efe2a642bc3c';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey
  }
});

export default api;
