function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
let timerId = null;

startBtnRef.addEventListener('click', () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    changesStartBtnStatus();
});

stopBtnRef.addEventListener('click', () => {
    clearInterval(timerId);
    changesStopBtnStatus();
});

function changesStartBtnStatus() {
    startBtnRef.disabled = true;
    stopBtnRef.disabled = false;
};

function changesStopBtnStatus() {
    stopBtnRef.disabled = true;
    startBtnRef.disabled = false;
};