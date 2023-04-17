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


const onImgFilterClick = (evt)=>{
  if(evt.target.id === 'filter-default'){
    evt.target.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    renderingSimilarPictures(defaultPictures);
    addedListenerOpenBigPic();
    handleMiniatureClick();
    return newData;
  }
  if(evt.target.id === 'filter-random'){
    evt.target.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    newData = [...data].sort(sortRandomly).slice(0,PICTURES_COUNT);
    renderingSimilarPictures(newData);
    addedListenerOpenBigPic();
    handleMiniatureClick();
  }
  if(evt.target.id === 'filter-discussed'){
    evt.target.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    newData = [...data].sort(sortByComments);
    renderingSimilarPictures(newData);
    addedListenerOpenBigPic();
    handleMiniatureClick();
  }
};


imgFiltersForm.addEventListener('click',debounce(onImgFilterClick));


export {data};
