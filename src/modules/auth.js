import { createAuth } from './createAuth';
import { store } from './store';

export const auth = (data) => {
  store.user.name = data.name;
  store.user.category = data.category;
  store.user.avatar = data.avatar;

  localStorage.setItem('name', data.name);
  localStorage.setItem(
    'category',
    store.category.find((item) => item.title === data.category).rus,
  );
  localStorage.setItem('avatar', data.avatar);

  localStorage.getItem('name') && createAuth();
};

/*
666AAAaaa@
 */
