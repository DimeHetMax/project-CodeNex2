import axios from 'axios';

const API = axios.create({
  baseURL: 'https://wedding-photographer.b.goit.study/api',
});
const feedbacksApi = async () => {
  const feedbackData = await API.get('feedbacks', {
    params: {
      limit: 9,
      page: 1,
    },
  });
  return feedbackData.data;
};
const categoriesApi = async () => {
  const categoriesData = await API.get('categories');
  return categoriesData.data;
};
const weddingPhotosApi = async ({
  pageNumber = 1,
  limit = 9,
  sortName = 'title',
  categoryId,
} = {}) => {
  const fetchWeddingPhotos = await API.get('wedding-photos', {
    params: {
      page: pageNumber,
      limit,
      sortName,
      categoryId,
    },
  });
  return fetchWeddingPhotos.data;
};
const orderApi = async ({ name, phone, message }) => {
  return API.post('orders', { name, phone, message });
};

export { categoriesApi, weddingPhotosApi, orderApi, feedbacksApi };
