import { avatarController } from './avatarController';
import { postData } from './postData';
import { API_URL } from './const';
import { createCard } from './createCard';
import { store } from './store';
import { auth } from './auth';

export const signInController = (callback) => {
  const form = document.querySelector('.form_sign-in');
  const button = document.querySelector('.form__submit_sign-in');
  const parrent = button.parentNode;
  const errorList = document.createElement('ul');
  errorList.style.listStyle = 'circle';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorList.textContent = '';
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const dataResponse = await postData(`${API_URL}/api/service/signin`, data);
    if (dataResponse.message) {
      form.querySelectorAll('input').forEach((input) => {
        input.style.border = '1px solid red';
      });
      const error = document.createElement('li');
      error.style.fontWeight = '300';
      error.style.fontSize = '14px';
      error.style.color = 'red';
      error.textContent = dataResponse.message;

      errorList.append(error);
      parrent.insertBefore(errorList, button);
      return;
    }

    auth(dataResponse);
    form.reset();
    callback(e);
  });
};

export const signUpController = (callback) => {
  const form = document.querySelector('.form_sign-up');

  const button = document.querySelector('.form__submit_sign-up-button');
  const parrent = button.parentNode;
  const errorList = document.createElement('ul');
  errorList.style.listStyle = 'circle';

  const crp = avatarController({
    inputFile: '.avatar__input',
    uploadResult: '.avatar__result',
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorList.textContent = '';
    if (form.password[0].value !== form.password[1].value) {
      const error = document.createElement('li');
      error.textContent = 'Пороли не совпадают';
      error.style.paddingBottom = '50px';
      error.style.color = 'red';

      errorList.append(error);
      parrent.insertBefore(errorList, button);
      return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.avatar = await crp.result({
      type: 'base64',
      size: 'viewport',
    });

    const dataResponse = await postData(`${API_URL}/api/service/signup`, data);
    if (dataResponse.errors) {
      const errors = dataResponse.errors.map((errObj) => {
        const error = document.createElement('li');
        error.style.fontWeight = '300';
        error.style.fontSize = '14px';
        error.style.color = 'red';
        error.textContent = errObj.message;
        return error;
      });
      errorList.append(...errors);
      parrent.insertBefore(errorList, button);

      return;
    }
    const servicesList = document.querySelector('.services__list');
    servicesList.append(createCard(dataResponse));
    store.services.push(dataResponse);

    auth(dataResponse);
    form.reset();
    crp.hideAvatar();
    callback(e);
  });
};
