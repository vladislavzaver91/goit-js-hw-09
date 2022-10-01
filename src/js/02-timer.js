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
    isActive: false,
    refs: {
        daysRef: document.querySelector('[data-days]'),
        hoursRef: document.querySelector('[data-hours]'),
        minutesRef: document.querySelector('[data-minutes]'),
        secondsRef: document.querySelector('[data-seconds]'),
    },

    start() {
        if(this.isActive) {
            return;
        }

        timerDeadline = new Date();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const delta = timerDeadline - currentTime;

            // if (delta <= 0) {
            //     clearInterval(this.intervalId);
            // }

            const { days, hours, minutes, seconds } = this.convertMs(delta);
            this.refs.daysRef.textContent = this.addLeadingZero(days);
            this.refs.hoursRef.textContent = this.addLeadingZero(hours);
            this.refs.minutesRef.textContent = this.addLeadingZero(minutes);
            this.refs.secondsRef.textContent = this.addLeadingZero(seconds);
        }, 1000)
    },

    convertMs(ms) {
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
    },

    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    },
}
startBtnRef.addEventListener('click', timer.start.bind(timer));

