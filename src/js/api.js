import axios from 'axios';

const API = axios.create({
  baseURL: 'https://wedding-photographer.b.goit.study/api',
});
const categoriesApi = () => {};
const weddingPhotosApi = () => {};
const orderApi = () => {};
const Feedback = () => {};

export { categoriesApi, weddingPhotosApi, orderApi, Feedback };
