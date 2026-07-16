const openModalBtn = document.querySelector('.burger-btn');
const closeModalBtn = document.querySelector('.mob-menu-close-btn');
const menuDiv = document.querySelector('.mob-menu');
const tabletMedia = window.matchMedia('(min-width: 768px)');

const onOpenModal = () => {
  menuDiv.classList.add('is-open');
  menuDiv.removeAttribute('inert');
  openModalBtn.setAttribute('aria-expanded', 'true');
  closeModalBtn.focus();
};
const onCloseModal = () => {
  const wasOpen = menuDiv.classList.contains('is-open');
  menuDiv.classList.remove('is-open');
  menuDiv.setAttribute('inert', '');
  openModalBtn.setAttribute('aria-expanded', 'false');
  if (wasOpen) {
    openModalBtn.focus();
  }
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
const handleEscape = e => {
  if (e.key === 'Escape' && menuDiv.classList.contains('is-open')) {
    onCloseModal();
  }
};
menuDiv.addEventListener('click', handleCloseMenuOnLinkClick);

openModalBtn.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', onCloseModal);
tabletMedia.addEventListener('change', handleScreenChange);
document.addEventListener('keydown', handleEscape);
