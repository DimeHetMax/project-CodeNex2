import Swal from 'sweetalert2';

const notification = (message) => {
  let timerInterval;
  Swal.fire({
    title: `${message} <br><b></b>`,
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector('b');
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  })
};

export default notification;