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
const load = (route,errorText,method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body})
    .then((response) => {
      if(!response.ok){
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(getErr(errorText));
    });


const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => {
  load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);
};
const data = await getData();

export { getData, sendData, data };
