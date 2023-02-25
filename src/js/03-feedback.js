import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('textarea');
const inputEl = document.querySelector('input');
const STORAGE_KEY = 'feedback-form-state';

let formData = {};

populateFormInput();

formEl.addEventListener('input', throttle(onInput, 500));

formEl.addEventListener('submit', onFormSubmit);

function onInput(e) {
  formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (!event.target.email.value || !event.target.message.value) {
    alert('Please fill in all the fields!');
    return;
  }

  event.target.reset();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
}

function populateFormInput() {
  try {
    let formLoad = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!formLoad) {
      return;
    }

    formData = formLoad;
    formEl.email.value = formData.email || '';
    formEl.message.value = formData.message || '';
  } catch (error) {
    console.error('Error.message ', error.message);
  }
}