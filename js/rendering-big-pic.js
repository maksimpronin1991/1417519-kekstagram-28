import { data } from './filter.js';


const AMOUNT_OF_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likes = bigPicture.querySelector('.likes-count');
const numberOfComments = bigPicture.querySelector('.comments-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const pictureComments = bigPicture.querySelector('.social__comments');

const commentsLoader = document.querySelector('.comments-loader');
const commentsCounter = document.querySelector('.social__comment-count');

const renderComment = (src, message, name) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = src;
  img.alt = name;
  img.width = '35';
  img.height = '35';
  const textMessage = document.createElement('p');
  textMessage.classList.add('social__text');
  textMessage.textContent = message;
  comment.append(img);
  comment.append(textMessage);
  pictureComments.append(comment);
};

const countAmountOfComments = () => {
  let currentComment = 0;
  return function() {
    currentComment += AMOUNT_OF_COMMENTS;
    return currentComment;
  };
};

const openBigPhoto = (evt) => {
  if(evt.target.closest('.picture')){
    const target = evt.target.closest('.picture');
    const currentPost = data.find((item) => item.id === Number(target.dataset.id));
    bigPictureImg.src = currentPost.url;
    likes.textContent = currentPost.likes;
    numberOfComments.textContent = currentPost.comments.length;
    pictureDescription.textContent = currentPost.description;

    commentsLoader.classList.add('hidden');
    pictureComments.innerHTML = '';

    const updateCommentElements = () => {
      const commentsCount = document.createElement('span');
      commentsCount.classList.add('comments-count');
      const lenghtComments = document.querySelectorAll('.social__comment').length;
      commentsCounter.textContent = `${lenghtComments} из `;
      commentsCounter.append(commentsCount);
      commentsCount.textContent = `${currentPost.comments.length} комментариев`;

      if(lenghtComments === currentPost.comments.length) {
        commentsLoader.classList.add('hidden');
      } else {
        commentsLoader.classList.remove('hidden');
      }
    };

    for(let i = 0; i < AMOUNT_OF_COMMENTS; i++){
      if(currentPost.comments[i]){
        const {avatar, message, name} = currentPost.comments[i];
        renderComment(avatar, message, name);
      }
    }
    updateCommentElements();
    const getCommentsAmount = countAmountOfComments();

    const renderNextComments = () => {
      const currentAmountOfComments = getCommentsAmount();
      const restComments = currentPost.comments.length - currentAmountOfComments;
      const nextAmountOfComments = currentAmountOfComments + AMOUNT_OF_COMMENTS;

      const getNextComments = (beforeNumber) => {
        for(let i = currentAmountOfComments; i < beforeNumber; i++){
          if(currentPost.comments[i]){
            const {avatar, message, name} = currentPost.comments[i];
            renderComment(avatar, message, name);
          }
        }
      };

      if(restComments >= AMOUNT_OF_COMMENTS && restComments <= currentPost.comments.length) {
        getNextComments(nextAmountOfComments);
      } else if (restComments > 0 && restComments < AMOUNT_OF_COMMENTS) {
        const restIndex = restComments + currentAmountOfComments;
        getNextComments(restIndex);
      }
      updateCommentElements();
    };

    commentsLoader.addEventListener('click', renderNextComments);

  }
};

function addedListenerOpenBigPic () {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.addEventListener('click', openBigPhoto);
  });
}

addedListenerOpenBigPic();
export {openBigPhoto,addedListenerOpenBigPic};
