const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.form__input'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
}
