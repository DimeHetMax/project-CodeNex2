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
        <img src=${successImage} alt="wedding" />
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
const addInputError = ({ name, phone, message }) => {
  if (name === '') {
    const nameInput = form.elements.name;
    nameInput.classList.add('is-error');
  }
  if (phone === '') {
    const phoneInput = form.elements.phone;
    phoneInput.classList.add('is-error');
  }
  if (message === '') {
    const messageInput = form.elements.message;
    messageInput.classList.add('is-error');
  }
};

const handleForm = async e => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    message: formData.get('message').trim(),
  };
  if (data.name === '' || data.phone === '' || data.message === '') {
    addInputError(data);
    errorNotification('The field is empty!');
    return;
  }
  try {
    const post = await orderApi({
      name: data.name,
      phone: data.phone,
      message: data.message,
    });
    if (post.status === 201) {
      success(html);
      form.reset();
    }
  } catch (error) {
    console.log(error);
    errorNotification(error);
  }
};
const inputData = {};
const onInput = e => {
  inputData[e.target.name] = e.target.value;

  if (e.target.value.trim() !== '') {
    e.target.classList.remove('is-error');
  }
};
form.addEventListener('submit', handleForm);
form.addEventListener('input', onInput);
