import notification from './ notification.js';
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

const createButtonMarkUp = categories => {
  return categories
    .map(({ _id, category }) => {
      return `
        <li data-id="${_id}">
            <button type="button" class="portfolio-button" data-id="${_id}">
                ${category}
            </button>
        </li>
        `;
    })
    .join('');
};
const renderButtons = async () => {
  try {
    const data = await categoriesApi();
    categoriesBtnList.insertAdjacentHTML('beforeend', createButtonMarkUp(data));
  } catch (error) {
    console.log(error);
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
const createGalleryMarkup = array => {
  return array
    .map(({ _id, img, title }) => {
      return `  
        <li class="portfolio-gallery-item" data-id="${_id}">
            <img src="${img}" alt="${title}">
        </li>`;
    })
    .join('');
};
const reset = () => {
  galleryList.innerHTML = '';
  totalItems = 0;
  pageNumber = 1;
  limit = 3;
  categoryId = null;
  totalCounted = 0;
};
const desabledLoadButton = bool => {
  loadMoreBtn.disabled = bool;
};
const renderGalleryImages = async () => {
  reset();
  showLoader();
  desabledLoadButton(true);

  try {
    const data = await weddingPhotosApi({});
    totalItems = data.totalItems;
    pageNumber += data.weddingPhotos.length / limit;
    totalCounted += data.weddingPhotos.length;
    paginationUpdate(totalCounted, totalItems);
    if (data.weddingPhotos.length === 0) {
      throw new Error('Empty array');
    }
    galleryList.insertAdjacentHTML(
      'beforeend',
      createGalleryMarkup(data.weddingPhotos)
    );
    desabledLoadButton(false);
    hideLoader();
  } catch (error) {
    console.log(error);
    errorNotification(error)
    reset();
    desabledLoadButton(true);
    hideLoader();
  }
};
renderGalleryImages();
const resetCredentials = (counted, items) => {
  if (counted >= items) {
    notification('NO MORE CONTENT')
    desabledLoadButton(true);
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
    galleryList.insertAdjacentHTML(
      'beforeend',
      createGalleryMarkup(data.weddingPhotos)
    );

    if (resetCredentials(totalCounted, totalItems)) {
      return;
    }

    desabledLoadButton(false);
    hideLoader();
  } catch (error) {
    console.log(error);
     errorNotification(error);
    desabledLoadButton(true);
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
  desabledLoadButton(true);
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
    galleryList.insertAdjacentHTML(
      'beforeend',
      createGalleryMarkup(data.weddingPhotos)
    );
    desabledLoadButton(false);
    if (resetCredentials(totalCounted, totalItems)) {
      desabledLoadButton(true);
      return;
    }
    hideLoader();
  } catch (error) {
    console.log(error);
     errorNotification(error)
    desabledLoadButton(true);
    hideLoader();
  }
};
categoriesBtnList.addEventListener('click', onCategoryButtons);
