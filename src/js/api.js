import axios from 'axios';

const API = axios.create({
  baseURL: 'https://wedding-photographer.b.goit.study/api',
});
const feedbacksApi = async () => {
  try {
    const feedbackData = await API.get('feedbacks', {
      params: {
        limit: 9,
        page: 1,
      },
    });
    return feedbackData.data;
  } catch (error) {
    console.log(error);
  }
};
const categoriesApi = async () => {
  try {
    const categoriesData = await API.get('categories');
    return categoriesData.data;
  } catch (error) {
    console.log(error);
  }
};
const weddingPhotosApi = async ({
  pageNumber = 1,
  limit = 9,
  sortName = 'title',
  categoryId,
} = {}) => {
  try {
    const fetchWeddingPhotos = await API.get('wedding-photos', {
      params: {
        page: `${pageNumber}`,
        limit: `${limit}`,
        sortName: `${sortName}`,
        categoryId,
      },
    });
    return fetchWeddingPhotos.data;
  } catch (error) {
    console.log(error);
  }
};
const orderApi = async ({ name, phone, message }) => {
  try {
    const postData = await API.post('orders', { name, phone, message });
    return postData;
  } catch (error) {
    console.log(error);
  }
};

export { categoriesApi, weddingPhotosApi, orderApi, feedbacksApi };
