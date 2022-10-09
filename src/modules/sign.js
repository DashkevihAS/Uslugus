import { avatarController } from './avatarController';
import { postData } from './postData';
import { API_URL } from './const';
import { createCard } from './createCard';
import { store } from './store';
import { auth } from './auth';

export const signInController = (callback) => {
  const form = document.querySelector('.form_sign-in');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    const dataResponse = await postData(`${API_URL}/api/service/signin`, data);
    if (dataResponse.errors) {
      console.log(dataResponse); // todo обработка оштибки
      return;
    }

    auth(dataResponse);
    form.reset();
    callback(e);
  });
};

export const signUpController = (callback) => {
  const form = document.querySelector('.form_sign-up');

  const crp = avatarController({
    inputFile: '.avatar__input',
    uploadResult: '.avatar__result',
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.password[0].value !== form.password[1].value) {
      console.log('Пороли не совпадают'); // todo обработка оштибки
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
      console.log(dataResponse); // todo обработка оштибки
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
