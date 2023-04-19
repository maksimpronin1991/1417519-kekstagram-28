import { isEscapeKey } from './util.js';
import { onDocumentKeydown } from './form.js';
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeBtnSucces = successMessage.querySelector('.success__button');
const closeBtnError = errorMessage.querySelector('.error__button');

const onDocumentKeydownInMessage = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccsesMessage();
    errorMessage.remove();
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const onOutsideMessage = (evt) => {
  const click = evt.composedPath().includes(document.querySelector('.success__inner'));
  if(!click){
    document.querySelector('.upload__status').remove();
    document.body.classList.remove('modal-open');
  }
};

function showSuccessMessage () {
  document.body.append(successMessage);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownInMessage);
  document.addEventListener('click', onOutsideMessage);
}

function showErrorMessage () {
  document.body.append(errorMessage);
  document.body.classList.add('modal-open');
  document.addEventListener('click', onOutsideMessage);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onDocumentKeydownInMessage);
}

function closeErrorMessage (){
  errorMessage.remove();
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydownInMessage);
  document.removeEventListener('click', onOutsideMessage);
}

function closeSuccsesMessage (){
  successMessage.remove();
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydownInMessage);
  document.removeEventListener('click', onOutsideMessage);
}

closeBtnError.addEventListener('click', closeErrorMessage);

closeBtnSucces.addEventListener('click', closeSuccsesMessage);

export {showSuccessMessage , showErrorMessage};
