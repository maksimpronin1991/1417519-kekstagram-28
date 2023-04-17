import { data } from './api.js';
import { debounce } from './util.js';
import { renderingSimilarPictures } from './rendering-images.js';
import { addedListenerOpenBigPic } from './rendering-big-pic.js';
import { handleMiniatureClick } from './open-big-pic.js';

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


const onImgFilter = (evt)=>{
  if(evt.target.id === 'filter-default'){
    evt.target.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    const debouncedPic = debounce(()=>renderingSimilarPictures(defaultPictures));
    debouncedPic();
    addedListenerOpenBigPic();
    handleMiniatureClick();
    return newData;
  }
  if(evt.target.id === 'filter-random'){
    evt.target.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');

    newData = [...data].sort(sortRandomly).slice(0,PICTURES_COUNT);

    const debouncedPic = debounce(()=> renderingSimilarPictures(newData));
    debouncedPic();
    addedListenerOpenBigPic();
    handleMiniatureClick();
  }
  if(evt.target.id === 'filter-discussed'){
    evt.target.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    newData = [...data].sort(sortByComments);
    const debouncedPic = debounce(()=> renderingSimilarPictures(newData));
    debouncedPic();
    addedListenerOpenBigPic();
    handleMiniatureClick();
  }
};

imgFiltersForm.addEventListener('click',onImgFilter);


export {data};
