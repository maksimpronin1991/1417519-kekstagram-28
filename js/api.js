import { setOnFormSubmit, closeImgEditForm } from './form.js';
import { showSuccessMessage,showErrorMessage } from './message.js';
import './message.js';


const imgFilters = document.querySelector('.img-filters');


const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные.Обновите страницу',
  SEND_DATA: 'Не удалось отправить форму.Попробуйте снова',
};
const getErr = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '20px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(()=>{
    alert.remove();
  },5000);
};

const load = (route,errorText,method = Method.GET, body = null, showErrorPopup = false) =>
  fetch(`${BASE_URL}${route}`, { method, body})
    .then((response) => {
      if(!response.ok){
        throw new Error();
      }
      imgFilters.classList.remove('img-filters--inactive');
      return response.json();
    })
    .catch(() => {
      if (showErrorPopup) {
        throw new Error(errorText);
      }

      getErr(errorText);
      return [];
    });


const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body, true);

setOnFormSubmit(async (formData) => {
  try{
    await sendData(formData);
    closeImgEditForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

const data = await getData();

export { data };
