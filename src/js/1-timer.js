import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('button[data-start]');
// const timer = document.querySelector('.timer');
const daysLeft = document.querySelector('span[data-days]');
const hoursLeft = document.querySelector('span[data-hours]');
const minutesLeft = document.querySelector('span[data-minutes]');
const secondsLeft = document.querySelector('span[data-seconds]');
const inputDataLeft = document.querySelector('#datetime-picker');
console.log(inputDataLeft);

btnStart.setAttribute('disabled', true);

let userSelectedDate = null;

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
      });

      btnStart.setAttribute('disabled', true);
    } else {
      btnStart.removeAttribute('disabled');
    }
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.addEventListener('click', onBtnStart);

function onBtnStart() {
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const timeLeft = userSelectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    daysLeft.textContent = String(`${days}`).padStart(2, '0');
    hoursLeft.textContent = String(`${hours}`).padStart(2, '0');
    minutesLeft.textContent = String(`${minutes}`).padStart(2, '0');
    secondsLeft.textContent = String(`${seconds}`).padStart(2, '0');

    inputDataLeft.disabled = true;

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      daysLeft.textContent = '00';
      hoursLeft.textContent = '00';
      minutesLeft.textContent = '00';
      secondsLeft.textContent = '00';
      inputDataLeft.disabled = false;
      return;
    }
  }, 1000);

  btnStart.setAttribute('disabled', true);
}
