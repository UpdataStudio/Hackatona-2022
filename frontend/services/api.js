import axios from 'axios';

export const BASE_URL = 'https://intelli.brintell.com/hackathona-api';
// export const BASE_URL = 'http://localhost/?';
const TOKEN_KEY = 'softex-quiz-token';

const api = axios.create({
    baseURL: BASE_URL
});

export const setToken = async (token) => {
    await window.localStorage.setItem(TOKEN_KEY, token);
    axios.defaults.headers.common['Authorization'] = token;
};

export const getToken = async () => {
    return await window.localStorage.getItem(TOKEN_KEY);
};

export default api;
