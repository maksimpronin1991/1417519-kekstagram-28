const pictures = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const renderingSimilarPictures = (arrPictures) => {

  const similarListFragment = document.createDocumentFragment();

  arrPictures.forEach(({id,url,likes,comments,description}) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.id = id;
    similarListFragment.appendChild(pictureElement);
  });
  document.querySelectorAll('.picture').forEach((el) => el.remove());

  pictures.appendChild(similarListFragment);
};

export {renderingSimilarPictures};
