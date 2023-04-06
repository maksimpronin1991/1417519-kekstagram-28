import { isEscapeKey } from './util.js';

const imgUploadInput = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const btnEditingFormCancel = document.querySelector('.img-upload__cancel');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const validateHashtagLength = (value) => {
  const arrHashtags = value.trim().split(' ');
  if(arrHashtags.length > 5){
    imgUploadSubmit.disabled = true;
    return false;
  }
  imgUploadSubmit.disabled = false;
  return true;
};

const validateHashtag = (value) => {
  const regexpForHashtag = (/^#[a-zа-яё0-9]{1,19}$/i);
  const arrHashtags = value.trim().split(' ');
  for(let i = 0; i < arrHashtags.length; i++){
    if(!regexpForHashtag.test(arrHashtags[i])){
      imgUploadSubmit.disabled = true;
      return false;
    }
  }
  imgUploadSubmit.disabled = false;
  return true;
};

const validateHashtagDublicate = (value) => {
  const arrHashtags = value.trim().split(' ');
  function hasDuplicates() {
    return new Set(arrHashtags).size !== arrHashtags.length;
  }

  if (hasDuplicates(arrHashtags)) {
    imgUploadSubmit.disabled = true;
    return false;
  }else {
    imgUploadSubmit.disabled = false;
    return true;
  }
};
pristine.addValidator(hashtagsField,validateHashtagLength,'Должно быть указанно максимум 5 хэштегов');
pristine.addValidator(hashtagsField,validateHashtag,'Должен начинаться с символа #, содержать более 1 менее 20 символов или чисел ');
pristine.addValidator(hashtagsField,validateHashtagDublicate,'Один и тот же хэш-тег не может быть использован дважды ');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgEditForm();
  }
};

function openImgEditForm () {
  imageEditingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImgEditForm () {
  imageEditingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

function addRemovingListener () {
  document.removeEventListener('keydown', onDocumentKeydown);
}

function addAddingListenter () {
  document.addEventListener('keydown', onDocumentKeydown);
}

hashtagsField.addEventListener('focus',addRemovingListener);
commentField.addEventListener('focus',addRemovingListener);

hashtagsField.addEventListener('blur',addAddingListenter);
commentField.addEventListener('blur',addAddingListenter);

imgUploadInput.addEventListener('change',openImgEditForm);

btnEditingFormCancel.addEventListener('click',closeImgEditForm);

