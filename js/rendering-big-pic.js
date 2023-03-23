import { similarPictures } from './rendering-images.js';
import './rendering-images.js';
import { createCommentList } from './rendering-comments.js';

const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likes = bigPicture.querySelector('.likes-count');
const numberOfComments = bigPicture.querySelector('.comments-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const pictureComments = bigPicture.querySelector('.social__comments');


const openBigPhoto = (evt) => {
  if(evt.target.closest('.picture')){
    const target = evt.target.closest('.picture');
    const currentDescripyion = similarPictures.find((item) => item.id === Number(target.dataset.id));
    const currentComments = currentDescripyion.comments;
    bigPictureImg.src = currentDescripyion.url;
    likes.textContent = currentDescripyion.likes;
    numberOfComments.textContent = currentDescripyion.comments.length;
    pictureDescription.textContent = currentDescripyion.description;
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    pictureComments.innerHTML = '';
    pictureComments.appendChild(createCommentList(currentComments));
  }
};

pictures.forEach((picture) => {
  picture.addEventListener('click', openBigPhoto);
});


