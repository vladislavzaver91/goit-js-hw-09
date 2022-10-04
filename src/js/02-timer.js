import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimeRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');

let currentDate = Date.now();
let futureDate = null;

startBtnRef.setAttribute('disbled', '');
startBtnRef.addEventListener('click', () => {
    timer.onStart();
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);
    futureDate = selectedDates[0]; 

    if (selectedDates[0] < currentDate) {
        Notify.failure('Please choose a date in the future', {
            position: 'center-center',
            cssAnimationStyle: 'from-top',
            backOverlay: true,
            clickToClose: true,
            closeButton: true,
        });
        startBtnRef.setAttribute('disabled', '');
    } else {
        startBtnRef.removeAttribute('disabled');
    };
    },
};

flatpickr(datetimeRef, options);

const timer = {
    intervalId: null,
    refs: {
        daysRef: document.querySelector('[data-days]'),
        hoursRef: document.querySelector('[data-hours]'),
        minutesRef: document.querySelector('[data-minutes]'),
        secondsRef: document.querySelector('[data-seconds]'),
    },

    onStart() {
        Notify.success('Welcome to the future!', {
            position: 'center-center',
        });

        this.intervalId = setInterval(() => {
            const deltaTime = futureDate - new Date();
            const timerComponents = this.convertMs(deltaTime);

            if (deltaTime <= 1000) {
                clearInterval(this.intervalId);
            }
            
            this.refs.daysRef.textContent = this.addLeadingZero(timerComponents.days);
            this.refs.hoursRef.textContent = this.addLeadingZero(timerComponents.hours);
            this.refs.minutesRef.textContent = this.addLeadingZero(timerComponents.minutes);
            this.refs.secondsRef.textContent = this.addLeadingZero(timerComponents.seconds);
        }, 1000);
    },

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
        return { days, hours, minutes, seconds };
    },

    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    },
};
