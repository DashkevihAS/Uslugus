import { createCard } from './createCard';
import { store } from './store';

export const filterList = (category) => {
  const serviceList = document.querySelector('.services__list');

  const filteredData = store.services.filter((obj) => obj.category == category);
  serviceList.textContent = '';

  const cards = filteredData.map(createCard);
  serviceList.append(...cards);
};
