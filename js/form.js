import './scale.js';
import './effects.js';
import { resetScale } from './scale.js';
import { isEscapeKey } from './util.js';

const imgUploadInput = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const btnEditingFormCancel = document.querySelector('.img-upload__cancel');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const fileField = document.querySelector('#upload-file');
const modalUpload = form.querySelector('.img-upload__overlay');

const pristine = new Pristine(form,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const validateHashtag = (value) => {

  const validateHashtagLength = () => {
    const arrHashtags = value.trim().split(' ');
    if(arrHashtags.length > 5){
      return false;
    }
    return true;
  };

  const validateHashtagExp = () => {
    const regexpForHashtag = (/^#[a-zа-яё0-9]{1,19}$/i);
    const arrHashtags = value.trim().split(' ');
    for(let i = 0; i < arrHashtags.length; i++){
      if(!regexpForHashtag.test(arrHashtags[i])){
        return false;
      }
    }
    return true;
  };

  const validateHashtagDublicate = () => {
    const arrHashtags = value.trim().split(' ');
    function hasDuplicates() {
      return new Set(arrHashtags).size !== arrHashtags.length;
    }

    if (hasDuplicates(arrHashtags)) {
      return false;
    }
    return true;
  };

  if(validateHashtagLength(value) && validateHashtagExp(value) && validateHashtagDublicate(value)){
    imgUploadSubmit.disabled = false;
    return true;
  }else if (value.length === 0){
    imgUploadSubmit.disabled = false;
    return true;
  }
  imgUploadSubmit.disabled = true;
  return false;
};
pristine.addValidator(hashtagsField,validateHashtag,'Должен начинаться с символа #, содержать более 1 менее 20 символов или чисел,должно быть указанно максимум 5 хэштегов, один и тот же хэш-тег не может быть использован дважды.');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgEditForm();
  }
};

function openImgEditForm () {
  imageEditingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const file = fileField.files[0];
  const preview = modalUpload.querySelector('img');

  preview.src = URL.createObjectURL(file);

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImgEditForm () {
  imageEditingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  form.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
}

function addRemovingListener () {
  document.removeEventListener('keydown', onDocumentKeydown);
}

function addAddingListenter () {
  document.addEventListener('keydown', onDocumentKeydown);
}

function blockSubmitButton () {
  imgUploadSubmit.disabled = true;
}

function unblockSubmitButton () {
  imgUploadSubmit.disabled = false;
}

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid){
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};


hashtagsField.addEventListener('focus',addRemovingListener);
commentField.addEventListener('focus',addRemovingListener);

hashtagsField.addEventListener('blur',addAddingListenter);
commentField.addEventListener('blur',addAddingListenter);

imgUploadInput.addEventListener('change',openImgEditForm);

btnEditingFormCancel.addEventListener('click',closeImgEditForm);

export {closeImgEditForm, setOnFormSubmit};
