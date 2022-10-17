import { renderAuth } from './renderAuth';
import { store } from './store';

export const auth = (data) => {
  store.user.name = data.name;
  store.user.category = data.category;
  store.user.avatar = data.avatar;
  store.user.id = data.id;

  localStorage.setItem('name', data.name);
  localStorage.setItem(
    'category',
    store.category.find((item) => item.title === data.category).rus,
  );
  localStorage.setItem('avatar', data.avatar);
  localStorage.setItem('id', data.id);

  localStorage.getItem('name') && renderAuth();
};

/*
666@mail.ru
666AAAaaa@
 */
