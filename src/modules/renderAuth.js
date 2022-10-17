import { API_URL } from './const';
import { getData } from './getData';
import { modalController } from './modalController';
import { store } from './store';

export const renderAuth = () => {
  const name = localStorage.getItem('name');
  const category = localStorage.getItem('category');
  const avatar = localStorage.getItem('avatar');

  const headerAuth = document.querySelector('.header__auth');
  const headerContainer = document.querySelector('.header__container');

  const previousAuth = document.querySelector('.auth');
  if (previousAuth) {
    previousAuth.remove();
  }
  const auth = document.createElement('div');
  auth.classList.add('auth');

  auth.innerHTML = `
    <img class="auth__img" src=${API_URL}/${avatar} alt=${category} ${name} />
    <span class="auth__name">${name}</span>
    <span class="auth__category">${category}</span>
  `;

  const buttonChange = document.createElement('button');
  buttonChange.classList.add('auth__change');
  buttonChange.textContent = 'Изменить услугу';
  auth.append(buttonChange);

  const imgMobile = new Image(24, 24);
  imgMobile.classList.add('auth__img_mobile');
  imgMobile.src = `${API_URL}/${avatar}`;
  imgMobile.alt = `${category} ${name}`;

  headerAuth.style.display = 'none';
  headerContainer.append(auth, imgMobile);

  modalController({
    modal: '.modal_sign-up',
    btnOpen: '.auth__change',
    btnClose: '.modal__close',
    handlerOpenModal: async () => {
      const id = localStorage.getItem('id');
      const data = await getData(`${API_URL}/api/service/${id}`);
      const form = document.querySelector('.form_sign-up');
      form.action = `${API_URL}/api/service/${id}`;
      form.dataset.method = 'PATCH';

      form.name.value = data.name;
      form.surname.value = data.surname;
      form.phone.value = data.phone;
      form.email.value = data.email;
      form.price.value = data.price;
      form.about.value = data.about;
      form.direction._choices.setChoiceByValue(data.direction);
      form.category._choices.setChoiceByValue(data.category);
    },
  });
};
