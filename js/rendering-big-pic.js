import { similarPictures } from './rendering-images.js';
import './rendering-images.js';

const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likes = bigPicture.querySelector('.likes-count');
const numberOfComments = bigPicture.querySelector('.comments-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const pictureComments = bigPicture.querySelector('.social__comments');

const similarComment = document.querySelector('.social__comment');

const counterComments = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const COMMENT_FOR_PORTION = 5;
let commentShown = 0;
let comments;

const createComment = ({avatar, name, message}) => {
  const comment = similarComment.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};


const renderComments = () => {
  commentShown += COMMENT_FOR_PORTION;

  if (commentShown >= comments.length){
    commentsLoader.classList.add('hidden');
    commentShown = comments.length;
  }else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0 ; i < commentShown; i++){
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  pictureComments.textContent = '';
  pictureComments.append(fragment);
  counterComments.innerHTML = `${commentShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const openBigPhoto = (evt) => {
  if(evt.target.closest('.picture')){
    const target = evt.target.closest('.picture');
    const currentDescripyion = similarPictures.find((item) => item.id === Number(target.dataset.id));
    const currentComments = currentDescripyion.comments;
    bigPictureImg.src = currentDescripyion.url;
    likes.textContent = currentDescripyion.likes;
    numberOfComments.textContent = currentDescripyion.comments.length;
    pictureDescription.textContent = currentDescripyion.description;
    comments = currentComments;
    renderComments();
    commentsLoader.addEventListener('click', renderComments);

  }
};

pictures.forEach((picture) => {
  picture.addEventListener('click', openBigPhoto);
});


/*
доработайте код по выводу списка комментариев таким образом, чтобы список показывался не полностью,
а по 5 элементов, и следующие 5 элементов добавлялись бы по нажатию на кнопку «Загрузить ещё».
Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.


*/


