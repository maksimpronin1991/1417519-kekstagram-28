import {createArrPicturesDescriptions} from './data-generate.js';

const pictures = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = createArrPicturesDescriptions(25);

const similarListFragment = document.createDocumentFragment();

similarPictures.forEach(({url,likes,comments}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  similarListFragment.appendChild(pictureElement);
});

pictures.appendChild(similarListFragment);
