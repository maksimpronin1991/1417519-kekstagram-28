const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const btnScaleSmaller = document.querySelector('.scale__control--smaller');
const btnScaleBigger = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imgUpload = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imgUpload.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};


const onSmallerBtn = () => {
  const currentValue = parseInt(scaleInput.value,10);
  let newValue = currentValue - SCALE_STEP;
  if(newValue < MIN_SCALE){
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};
const onBiggerBtn = () => {
  const currentValue = parseInt(scaleInput.value,10);
  let newValue = currentValue + SCALE_STEP;
  if(newValue > MAX_SCALE){
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

btnScaleSmaller.addEventListener('click',onSmallerBtn);
btnScaleBigger.addEventListener('click',onBiggerBtn);

export {resetScale};
