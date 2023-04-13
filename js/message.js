import { isEscapeKey } from './util.js';
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const closeBtnSucces = successMessage.querySelector('.success__button');
const closeBtnError = errorMessage.querySelector('.error__button');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccsesMessage();
  }
};

const onOutsideMessage = (evt) => {
};

function showSuccessMessage () {
  document.body.append(successMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideMessage);
}

function showErrorMessage () {
  document.body.append(errorMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideMessage);
}

function closeErrorMessage (){
  errorMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutsideMessage);
}
function closeSuccsesMessage (){
  successMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutsideMessage);
}

closeBtnError.addEventListener('click', closeErrorMessage);

closeBtnSucces.addEventListener('click', closeSuccsesMessage);

export {showSuccessMessage , showErrorMessage};
