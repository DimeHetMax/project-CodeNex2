import notification from './notification.js';
import errorNotification from './errorNotification.js';

import { categoriesApi, weddingPhotosApi } from './api.js';
import { showLoader, hideLoader } from './loader.js';

const categoriesBtnList = document.querySelector('.portfolio-buttons-list');
const galleryList = document.querySelector('.portfolio-gallery-list');
const loadMoreBtn = document.querySelector('.portfolio-button-load-more');
const currentUploadedPhotos = document.querySelector(
  '.portfolio-uploaded-photo'
);
const totalAmountPhotos = document.querySelector('.portfolio-total-amount');
loadMoreBtn.disabled = true;

const createCategoryButtons = categories => {
  const fragment = document.createDocumentFragment();

  categories.forEach(({ _id, category }) => {
    const item = document.createElement('li');
    const button = document.createElement('button');

    item.dataset.id = _id;
    button.type = 'button';
    button.className = 'portfolio-button';
    button.dataset.id = _id;
    button.textContent = category;
    item.append(button);
    fragment.append(item);
  });

  return fragment;
};
const renderButtons = async () => {
  try {
    const data = await categoriesApi();
    categoriesBtnList.append(createCategoryButtons(data));
  } catch (error) {
    errorNotification(error.message ?? 'Unable to load categories');
  }
};
renderButtons();

let totalItems = 0;
let limit = 3;
let pageNumber = 1;
let categoryId;
let totalCounted = 0;

const paginationUpdate = (counted, items) => {
  currentUploadedPhotos.textContent = counted;
  totalAmountPhotos.textContent = items;
};
const createGalleryItems = photos => {
  const fragment = document.createDocumentFragment();

  photos.forEach(({ _id, img, title }) => {
    const item = document.createElement('li');
    const image = document.createElement('img');

    item.className = 'portfolio-gallery-item';
    item.dataset.id = _id;
    image.src = img;
    image.alt = title;
    image.loading = 'lazy';
    item.append(image);
    fragment.append(item);
  });

  return fragment;
};
const reset = () => {
  galleryList.innerHTML = '';
  totalItems = 0;
  pageNumber = 1;
  limit = 3;
  categoryId = null;
  totalCounted = 0;
};
const setLoadButtonDisabled = bool => {
  loadMoreBtn.disabled = bool;
};
const renderGalleryImages = async () => {
  reset();
  showLoader();
  setLoadButtonDisabled(true);

  try {
    const data = await weddingPhotosApi({});
    totalItems = data.totalItems;
    pageNumber += data.weddingPhotos.length / limit;
    totalCounted += data.weddingPhotos.length;
    paginationUpdate(totalCounted, totalItems);
    if (data.weddingPhotos.length === 0) {
      throw new Error('Empty array');
    }
    galleryList.append(createGalleryItems(data.weddingPhotos));
    setLoadButtonDisabled(totalCounted >= totalItems);
    hideLoader();
  } catch (error) {
    errorNotification(error.message ?? 'Unable to load photos');
    reset();
    setLoadButtonDisabled(true);
    hideLoader();
  }
};
renderGalleryImages();
const resetCredentials = (counted, items) => {
  if (counted >= items) {
    notification('NO MORE CONTENT');
    setLoadButtonDisabled(true);
    hideLoader();
    return true;
  }
};
const handleLoadMoreButton = async () => {
  showLoader();
  if (resetCredentials(totalCounted, totalItems)) {
    return;
  }
  try {
    const data = await weddingPhotosApi({ pageNumber, limit, categoryId });
    totalCounted += data.weddingPhotos.length;
    pageNumber += 1;
    paginationUpdate(totalCounted, totalItems);
    galleryList.append(createGalleryItems(data.weddingPhotos));

    if (resetCredentials(totalCounted, totalItems)) {
      return;
    }

    setLoadButtonDisabled(false);
    hideLoader();
  } catch (error) {
    errorNotification(error.message ?? 'Unable to load more photos');
    setLoadButtonDisabled(true);
    hideLoader();
  }
};
loadMoreBtn.addEventListener('click', handleLoadMoreButton);
const handleActiveButton = targetButton => {
  const activeButton = categoriesBtnList.querySelector('.active');
  activeButton.classList.remove('active');
  targetButton.classList.add('active');
};
const onCategoryButtons = async e => {
  const targetButton = e.target.closest('button');
  if (!targetButton) {
    return;
  }
  handleActiveButton(targetButton);
  setLoadButtonDisabled(true);
  showLoader();
  reset();
  categoryId = targetButton.dataset.id;
  try {
    const data = await weddingPhotosApi({ categoryId });
    totalItems = data.totalItems;
    pageNumber += data.weddingPhotos.length / limit;
    totalCounted += data.weddingPhotos.length;
    paginationUpdate(totalCounted, totalItems);
    if (data.weddingPhotos.length === 0) {
      throw new Error('Empty array');
    }
    galleryList.append(createGalleryItems(data.weddingPhotos));
    setLoadButtonDisabled(false);
    if (resetCredentials(totalCounted, totalItems)) {
      setLoadButtonDisabled(true);
      return;
    }
    hideLoader();
  } catch (error) {
    errorNotification(error.message ?? 'Unable to load this category');
    setLoadButtonDisabled(true);
    hideLoader();
  }
};
categoriesBtnList.addEventListener('click', onCategoryButtons);
