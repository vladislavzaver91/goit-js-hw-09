import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name=delay]'),
  inputStep: document.querySelector('[name=step]'),
  inputAmount: document.querySelector('[name=amount]'),
};

refs.form.addEventListener('submit', onBtnClick);

function onBtnClick (ev) {
  ev.preventDefault();

  let position = null;
  let delay = Number(refs.inputDelay.value);

  for (let i = 0; i < Number(refs.inputAmount.value); i += 1) {
    position += 1;

    createPromise(position, delay)
    .then(({position, delay}) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    delay += Number(refs.inputStep.value)
  }

  ev.currentTarget.reset();
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
};