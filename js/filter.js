import { data } from './api.js';
import { renderingSimilarPictures } from './rendering-images.js';
import { addedListenerOpenBigPic,openBigPhoto } from './rendering-big-pic.js';

renderingSimilarPictures(data);

const PICTURES_COUNT = 10;
const imgFiltersForm = document.querySelector('.img-filters__form');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');


const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
let newData = data;
const defaultPictures = data;

// function debounce (callback, timeoutDelay = 500) {
//   let timeoutId;

//   return (...rest) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
//   };
// }

const onImgFilter = (evt)=>{
  if(evt.target.id === 'filter-default'){
    evt.target.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    document.querySelectorAll('.picture').forEach((el) => el.remove());
    renderingSimilarPictures(defaultPictures);
    return newData;
  }
  if(evt.target.id === 'filter-random'){
    evt.target.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');

    newData = [...data].sort(sortRandomly).slice(0,PICTURES_COUNT);
    document.querySelectorAll('.picture').forEach((el) => el.remove());
    renderingSimilarPictures(newData);
    addedListenerOpenBigPic(data);
  }
  if(evt.target.id === 'filter-discussed'){
    evt.target.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    newData = [...data].sort(sortByComments);
    document.querySelectorAll('.picture').forEach((el) => el.remove());
    renderingSimilarPictures(newData);
    document.querySelectorAll('.picture').forEach((pic) => pic.addEventListener('click',openBigPhoto));
  }
};

imgFiltersForm.addEventListener('click',onImgFilter);


export {data};
