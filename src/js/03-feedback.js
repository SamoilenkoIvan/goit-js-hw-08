import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const form = document.querySelector(".feedback-form");
const textarea = document.querySelector("textarea");
const input = document.querySelector("input");
form.addEventListener('submit', onFormSubmit());
form.addEventListener('input', throttle(onInput, 500));

function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}
function onInput(e) {
    formData.email = input.value;
    formData.message = textarea.value;
    return localStorage.setItem('STORAGE_KEY', JSON.stringify(formData));
}
function populateFormInput () {
    if (parsedData) {
        return (
        (input.value = parsedData.email || ''),
        (textarea.value = parsedData.message || '')
        );
    }
}
