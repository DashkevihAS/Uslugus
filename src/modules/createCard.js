import { API_URL } from './const';
import { directions } from './const';
import { createStars } from './createStars';
import { store } from './store';

export const createCard = (obj) => {
  const { avatar, category, comments, direction, id, name, surname, price } =
    obj;

  const serviceItem = document.createElement('li');
  serviceItem.classList.add('services__item');

  const service = document.createElement('article');
  service.classList.add('service');
  service.dataset.id = id;
  serviceItem.append(service);

  const serviceAvatar = new Image(50, 50);
  serviceAvatar.classList.add('service__avatar');
  serviceAvatar.src = `${API_URL}/${avatar}`;
  serviceAvatar.alt = `${category} ${surname} ${name}`;

  const servicePresent = document.createElement('div');
  servicePresent.classList.add('service__present');

  const serviceTitle = document.createElement('h3');
  serviceTitle.classList.add('service__title');
  serviceTitle.textContent = store.category.find(
    (item) => item.title === category,
  ).rus;

  const serviceName = document.createElement('p');
  serviceName.classList.add('service__name');
  serviceName.textContent = `${name} ${surname[0]}.`;

  servicePresent.append(serviceTitle, serviceName);

  const servicePrice = document.createElement('p');
  servicePrice.classList.add('service__price');
  servicePrice.textContent = `${directions[direction]} ${price} ₽`;

  const serviceReview = document.createElement('div');
  serviceReview.classList.add('service__review');

  const serviceCountReview = document.createElement('p');
  serviceCountReview.classList.add('service__count-review');
  serviceCountReview.textContent = comments.length;

  serviceReview.append(createStars(comments), serviceCountReview);

  service.append(serviceAvatar, servicePresent, servicePrice, serviceReview);
  return serviceItem;
};
