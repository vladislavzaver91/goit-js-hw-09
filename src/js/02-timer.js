import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimeRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
let timerDeadline = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);
    timerDeadline = selectedDates[0].getTime();

    if (timerDeadline < Date.now()) {
        alert('Please choose a date in the future');
        startBtnRef.setAttribute('disabled', false);
    } else {
        startBtnRef.toggleAttribute('disabled');
    }
    },
};

flatpickr(datetimeRef, options);

const timer = {
    intervalId: null,
    refs:{
        daysRef: document.querySelector('[data-days]'),
        hoursRef: document.querySelector('[data-hours]'),
        minutesRef: document.querySelector('[data-minutes]'),
        secondsRef: document.querySelector('[data-seconds]'),
    },

    start() {
        timerDeadline = new Date();
        this.intervalId = setInterval(() => {
            const delta = timerDeadline - Date.now();
            const timeComponents = convertMs(delta);
            const { days, hours, minutes, seconds } = this.refs;
            this.refs.daysRef.textContent = addLeadingZero(timeComponents.days);
            this.refs.hoursRef.textContent = addLeadingZero(timeComponents.hours);
            this.refs.minutesRef.textContent = addLeadingZero(timeComponents.minutes);
            this.refs.secondsRef.textContent = addLeadingZero(timeComponents.seconds);
            // console.log(timeComponents);
            console.log(delta);
            console.log(timeComponents);
        }, 1000)
    },

    
}

timer.start();

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
