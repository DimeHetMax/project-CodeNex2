import Swal from 'sweetalert2';

const success = html => {
  let timerInterval;
  Swal.fire({
    html: `${html} <br><b></b>`,
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  })
};
export default success;
