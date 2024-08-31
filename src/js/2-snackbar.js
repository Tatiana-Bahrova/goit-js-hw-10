import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  let delay = Number(document.querySelector('input[name="delay"]').value);

  let ratio = document.querySelectorAll('input[type="radio"]');
  let ratioData = null;
  for (let i = 0; i < ratio.length; i++) {
    if (ratio[i].checked) {
      ratioData = ratio[i].value;
      break;
    }
  }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ratioData === 'fulfilled') {
        resolve(delay);
      } else if (ratioData === 'rejected') {
        reject(delay);
      }
    }, delay);
    form.reset();
  });

  promise
    .then(() => {
      iziToast.success({
        position: 'topRight',
        message: `Fulfilled promise in ${delay} ms`,
      });
    })
    .catch(() => {
      iziToast.error({
        position: 'topRight',
        icon: '',
        message: `❌ Rejected promise in ${delay} ms`,
      });
    });
});
