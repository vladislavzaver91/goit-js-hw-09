const refs = {
  submitBtn: document.querySelector('button'),
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name=delay]'),
  inputStep: document.querySelector('[name=step]'),
  inputAmount: document.querySelector('[name=amount]'),
};
console.log(refs.form);
console.log(refs.inputDelay);
console.log(refs.inputStep);
console.log(refs.inputAmount);


refs.submitBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  let position = null;
  for (let i = 0; i < Number(refs.inputAmount.value); i += 1) {
    position += 1;
    const Count = Number(refs.inputStep.value) + Number(refs.inputDelay.value);

    createPromise(position, Count)
    .then(({position, delay}) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    
  }
});


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve('ok');
      } else {
        reject('err');
      }
    }, delay);
  });
};