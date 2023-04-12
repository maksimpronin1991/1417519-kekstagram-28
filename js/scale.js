const Scale = {
  min: 25,
  max: 100,
  step: 25,
  default: 100,
};


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
  let newValue = currentValue - Scale.step;
  if(newValue < Scale.min){
    newValue = Scale.min;
  }
  scaleImage(newValue);
};
const onBiggerBtn = () => {
  const currentValue = parseInt(scaleInput.value,10);
  let newValue = currentValue + Scale.step;
  if(newValue > Scale.max){
    newValue = Scale.max;
  }
  scaleImage(newValue);
};

const resetScale = () => {
  scaleImage(Scale.default);
};

btnScaleSmaller.addEventListener('click',onSmallerBtn);
btnScaleBigger.addEventListener('click',onBiggerBtn);

export {resetScale};
