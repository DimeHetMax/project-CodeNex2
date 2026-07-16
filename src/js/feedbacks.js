import Swiper from 'swiper';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { feedbacksApi } from './api';
import errorNotification from './errorNotification.js';

const ulEl = document.querySelector('.feedbacks-list');

const createFeedbackItems = feedbacks => {
  const fragment = document.createDocumentFragment();

  feedbacks.forEach(({ descr, name }) => {
    const item = document.createElement('li');
    const wrapper = document.createElement('div');
    const comment = document.createElement('p');
    const author = document.createElement('p');

    item.className = 'feedbacks-item swiper-slide';
    wrapper.className = 'feedbacks-item-textual-wrapper';
    comment.className = 'feedbacks-comments';
    author.className = 'feedbacks-names';
    comment.textContent = descr;
    author.textContent = name;

    wrapper.append(comment, author);
    item.append(wrapper);
    fragment.append(item);
  });

  return fragment;
};

const initSwiper = () =>
  new Swiper('.swiper', {
    modules: [Navigation, Pagination, Mousewheel, Keyboard],
    spaceBetween: 24,
    speed: 500,
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

const renderFeedbacks = async () => {
  try {
    const data = await feedbacksApi();
    if (!data.feedbacks?.length) {
      throw new Error('No feedback is currently available');
    }
    ulEl.replaceChildren(createFeedbackItems(data.feedbacks));
  } catch (error) {
    errorNotification(error.message ?? 'Unable to load feedback');
  } finally {
    initSwiper();
  }
};

renderFeedbacks();
