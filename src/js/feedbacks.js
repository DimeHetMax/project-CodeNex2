import Swiper from 'swiper';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { feedbacksApi } from './api';

const ulEl = document.querySelector('.feedbacks-list');

const createMarkup = array => {
  return array
    .map(({ descr, name }) => {
      return `
       <li class="feedbacks-item swiper-slide">
       <div class="feedbacks-item-textual-wrapper">
          <p class="feedbacks-comments">
           ${descr}
          </p>
          <p class="feedbacks-names">${name}</p>
        </div>
        </li>`;
    })
    .join('');
};
const renderMarkUp = async () => {
  ulEl.textContent = '';
  try {
    const data = await feedbacksApi();
    if (data) {
    }
    ulEl.insertAdjacentHTML('afterbegin', createMarkup(data.feedbacks));
  } catch (error) {
    console.log(error);
  }
};
renderMarkUp();

new Swiper('.swiper', {
  modules: [Navigation, Pagination, Mousewheel, Keyboard],
  spaceBetween: 24,
  speed: 500,
  // Responsive breakpoints
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
  },
  mousewheel: {
    forceToAxis: true,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  navigation: {
    nextEl: '.feedbacks-button-next',
    prevEl: '.feedbacks-button-prev',
  },
  pagination: {
    el: '.custom-swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },
});
