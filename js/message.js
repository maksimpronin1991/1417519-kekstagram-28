const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const closeBtnSucces = successMessage.querySelector('.success__button');
const closeBtnError = errorMessage.querySelector('.error__button');
import { isEscapeKey } from './util.js';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

function showSuccessMessage () {
  document.body.append(successMessage);
}

function showErrorMessage () {
  document.body.append(errorMessage);
}

function closeErrorMessage (){
  errorMessage.remove();
}
function closeSuccsesMessage (){
  successMessage.remove();
}

closeBtnError.addEventListener('click', closeErrorMessage());

closeBtnSucces.addEventListener('click', closeSuccsesMessage());

export {showSuccessMessage , showErrorMessage};
