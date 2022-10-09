import { API_URL } from './const';

export const createAuth = () => {
  const name = localStorage.getItem('name');
  const category = localStorage.getItem('category');
  const avatar = localStorage.getItem('avatar');

  const headerAuth = document.querySelector('.header__auth');
  const headerContainer = document.querySelector('.header__container');

  const auth = document.createElement('div');
  auth.classList.add('auth');

  auth.innerHTML = `
    <img class="auth__img" src=${API_URL}/${avatar} alt=${category} ${name} />
    <span class="auth__name">${name}</span>
    <span class="auth__category">${category}</span>
    <button class="auth__change">Изменить услугу</button>
  `;
  const imgMobile = new Image(24, 24);
  imgMobile.classList.add('auth__img_mobile');
  imgMobile.src = `${API_URL}/${avatar}`;
  imgMobile.alt = `${category} ${name}`;

  headerAuth.style.display = 'none';
  headerContainer.append(auth, imgMobile);
};
