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
import { renderAuth } from './modules/renderAuth';
import { renderPerson } from './modules/renderPerson';
import { commentsHighController } from './modules/commentsHighController';
import { commentController } from './modules/commentController';

const init = async () => {
  await getCategory();
  renderList();

  const eventModalSignIn = modalController({
    modal: '.modal_sign-in',
    btnOpen: '.header__auth-btn_sign-in',
    btnClose: '.modal__close',
    handlerCloseModal: () => {
      const form = document.querySelector('.form_sign-in');
      form.querySelectorAll('input').forEach((input) => {
        input.style.border = 'none';
      });
      if (form.querySelector('ul')) {
        form.querySelector('ul').textContent = '';
      }
    },
  });
  const eventModalSignUp = modalController({
    modal: '.modal_sign-up',
    btnOpen: '.header__auth-btn_sign-up',
    btnClose: '.modal__close',
    handlerCloseModal: () => {
      const form = document.querySelector('.form_sign-up');
      if (form.querySelector('ul')) {
        form.querySelector('ul').textContent = '';
      }
    },
  });
  modalController({
    modal: '.modal_person',
    btnOpen: '.service',
    parrentBtns: '.services__list',
    btnClose: '.modal__close',
    handlerOpenModal: async ({ handler, modalElem, closeModal }) => {
      const data = await getData(
        `${API_URL}/api/service/${handler.dataset.id} `,
      );
      renderPerson(data, modalElem);
      commentsHighController();
      commentController(data, closeModal);
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

  searchControl();
  ratingController();
  signUpController(eventModalSignUp.closeModal);
  signInController(eventModalSignIn.closeModal);

  if (localStorage.getItem('name')) {
    renderAuth();

    selectController({
      openBtn: '.auth__img_mobile',
      openBlock: '.auth',
      closeBtn: '.auth__img_mobile',
      display: 'grid',
    });
  }
};

init();
