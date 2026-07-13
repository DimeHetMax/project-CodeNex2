import success from './success.js';
import errorNotification from './errorNotification.js';
import { orderApi } from './api.js';

const form = document.querySelector('.contacts-form');
const html = `<div class="modal_success">
  <div class="modal_success-container">
    <div class="modal_success-content-wrapper">
      <h2>Thank You for Your Inquiry!</h2>
      <div class="modal_success-img-container">
        <img src="/img/modal/success-modal.jpg" alt="wedding" />
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
    name: formData.get('name'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  };
  if (data.name === '' || data.phone === '' || data.message === '') {
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
    }
  } catch (error) {
    console.log(error);
    errorNotification(error);
  }

  form.reset();
};
form.addEventListener('submit', handleForm);
