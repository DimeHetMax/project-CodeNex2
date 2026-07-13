import Swal from 'sweetalert2';

const errorNotification = (message) => {
  Swal.fire({
  position: "top-end",
  icon: 'error',
  title: 'Oops...',
  text: `${message}`,
  showConfirmButton: false,
  timer: 2000
});
};

export default errorNotification;
