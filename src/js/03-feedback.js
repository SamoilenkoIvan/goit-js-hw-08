import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form  textarea'),
};
populateFormInput();

refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  if (refs.input.value === '' || refs.textarea.value === '') {
    return alert(`Please fill in all the fields!`);
  }

  const savedDatas = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedDatas);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}
function onInput(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormInput() {
  const savedValues = localStorage.getItem(STORAGE_KEY);
  if (savedValues) {
    const savedDataObject = JSON.parse(savedValues);
    if (savedDataObject.email !== undefined)
      refs.input.value = savedDataObject.email;
    if (savedDataObject.message !== undefined)
      refs.textarea.value = savedDataObject.message;
  }
}
