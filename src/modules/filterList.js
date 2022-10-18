import { createCard } from './createCard';
import { store } from './store';

export const filterList = (category) => {
  const serviceList = document.querySelector('.services__list');

  const filteredData = store.services.filter((obj) => obj.category == category);
  console.log('store.services: ', store.services);
  serviceList.textContent = '';
  console.log(category);
  console.log('store : ', store);

  const cards = filteredData.map(createCard);
  serviceList.append(...cards);
};
