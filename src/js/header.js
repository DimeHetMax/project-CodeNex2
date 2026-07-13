const openModalBtn = document.querySelector('.burger-btn');
const closeModalBtn = document.querySelector('.mob-menu-close-btn');
const menuDiv = document.querySelector('.mob-menu');
const tabletMedia = window.matchMedia('(min-width: 768px)');

const onOpenModal = () => {
  console.log('click on burger');
  menuDiv.classList.add('is-open');
};
const onCloseModal = () => {
  menuDiv.classList.remove('is-open');
};
const handleScreenChange = event => {
  if (event.matches) {
    onCloseModal();
  }
};
const handleCloseMenuOnLinkClick = e => {
  if (e.target.closest('a') !== null) {
    onCloseModal();
  }
};
menuDiv.addEventListener('click', handleCloseMenuOnLinkClick);

openModalBtn.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', onCloseModal);
tabletMedia.addEventListener('change', handleScreenChange);
