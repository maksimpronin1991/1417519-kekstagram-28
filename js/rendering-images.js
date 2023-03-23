import {createArrPicturesDescriptions} from './data-generate.js';


const pictures = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = createArrPicturesDescriptions(25);

const similarListFragment = document.createDocumentFragment();

similarPictures.forEach(({id,url,likes,comments,description}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.id = id;
  similarListFragment.appendChild(pictureElement);
});


pictures.appendChild(similarListFragment);
export {similarPictures};
