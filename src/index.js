import './index.html';
import './index.scss';
import { choicesController } from './modules/choicesController';
import { filterList } from './modules/filterList';
import { getCategory } from './modules/getCategory';
import { getData } from './modules/getData';
import { modalController } from './modules/modalController';
import { ratingController } from './modules/ratingController';
import { renderList } from './modules/renderList';
import { searchControl } from './modules/searchControl';
import { selectController } from './modules/selectController';
import { showPassword } from './modules/showPassword';
import { signInController, signUpController } from './modules/sign';
import { API_URL } from './modules/const';
import { createAuth } from './modules/createAuth';
import { createPersonService } from './modules/createPersonService';

const init = () => {
  const eventModalSignIn = modalController({
    modal: '.modal_sign-in',
    btnOpen: '.header__auth-btn_sign-in',
    btnClose: '.modal__close',
  });
  const eventModalSignUp = modalController({
    modal: '.modal_sign-up',
    btnOpen: '.header__auth-btn_sign-up',
    btnClose: '.modal__close',
    // handlerCloseModal: () => {
    //   const form = document.querySelector('.form_sign-up');
    //   form.reset();
    // },
  });
  modalController({
    modal: '.modal_person',
    btnOpen: '.service',
    parrentBtns: '.services__list',
    btnClose: '.modal__close',
    handlerOpenModal: async ({ handler, modalElem }) => {
      const data = await getData(
        `${API_URL}/api/service/${handler.dataset.id} `,
      );
      createPersonService(data, modalElem);

      const comments = document.querySelectorAll('.review__text');

      comments.forEach((comment) => {
        if (comment.scrollHeight > 38) {
          const button = document.createElement('button');
          button.classList.add('review__open');
          button.textContent = 'Развернуть';
          comment.after(button);

          button.addEventListener('click', () => {
            comment.classList.toggle('review__text_open');
            button.textContent =
              button.textContent === 'Развернуть' ? 'Свернуть' : 'Развернуть';
          });
        }
      });
    },
  });
  selectController({
    openBtn: '.category__title',
    openBlock: '.category__list',
    closeBtn: '.category__btn',
    handlerChange: (value) => {
      filterList(value);
    },
  });

  showPassword();
  choicesController();

  getCategory();
  renderList();
  searchControl();
  ratingController();
  signUpController(eventModalSignUp.closeModal);
  signInController(eventModalSignIn.closeModal);

  if (localStorage.getItem('name')) {
    createAuth();

    selectController({
      openBtn: '.auth__img_mobile',
      openBlock: '.auth',
      closeBtn: '.auth__img_mobile',
      display: 'grid',
    });
  }
};

init();
