import './index.html';
import './index.scss';
import { modalController } from './modules/modalController';
import { selectController } from './modules/selectController';

const init = () => {
  modalController({
    modal: '.modal_sign-in',
    btnOpen: '.header__auth-btn_sign-in',
    btnClose: '.modal__close',
  });
  modalController({
    modal: '.modal_sign-up',
    btnOpen: '.header__auth-btn_sign-up',
    btnClose: '.modal__close',
  });
  modalController({
    modal: '.modal_person',
    btnOpen: '.service',
    parrentBtns: '.services__list',
    btnClose: '.modal__close',
    handlerOpenModal: async () => {
      const data = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1',
      ).then((response) => response.json());

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
      console.log(value);
    },
  });
};

init();
