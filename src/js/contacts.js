import success from './success.js';
import errorNotification from './errorNotification.js';
import { orderApi } from './api.js';

const successImage = new URL(
  '../img/modal/success-modal.jpg',
  import.meta.url
).href;

const form = document.querySelector('.contacts-form');
const html = `<div class="modal_success">
  <div class="modal_success-container">
    <div class="modal_success-content-wrapper">
      <h2>Thank You for Your Inquiry!</h2>
      <div class="modal_success-img-container">
        <img src="${successImage}" alt="Newly married couple" />
      </div>
      <p>
        I have received your message and I'm so excited about your interest! I
        will get in touch with you within 24-48 hours to discuss the details of
        your wedding day. In the meantime, feel free to browse my portfolio or
        follow me on Instagram for more inspiration.
      </p>
    </div>
  </div>
</div>`;
const handleForm = async e => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    message: formData.get('message').trim(),
  };
  try {
    const post = await orderApi(data);
    if (post.status === 201) {
      success(html);
      form.reset();
    }
  } catch (error) {
    errorNotification(
      error.response?.data?.message ?? error.message ?? 'Unable to send inquiry'
    );
  }
};
const onInput = e => {
  if (e.target.validity.valid) {
    e.target.classList.remove('is-error');
  }
};
form.addEventListener('submit', handleForm);
form.addEventListener('input', onInput);
form.addEventListener(
  'invalid',
  e => e.target.classList.add('is-error'),
  true
);
