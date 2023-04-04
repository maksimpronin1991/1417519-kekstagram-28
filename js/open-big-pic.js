import { isEscapeKey } from './util.js';
import './rendering-big-pic.js';
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');
const btnBigPicturCancel = bigPicture.querySelector('.big-picture__cancel');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();

  }
};

function openBigPicture (){
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture (){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

}

pictures.forEach((picture) => {
  picture.addEventListener('click', openBigPicture);
});

btnBigPicturCancel.addEventListener('click',closeBigPicture);
