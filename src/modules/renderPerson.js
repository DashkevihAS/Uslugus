import { API_URL } from './const';
import { store } from './store';
import { directions } from './const';
import { createStars } from './createStars';
import { createComment } from './createComment';

export const renderPerson = (data) => {
  const {
    about,
    avatar,
    category,
    comments,
    direction,
    email,
    id,
    name,
    phone,
    surname,
    price,
  } = data;

  const service = document.querySelector('.person__service');
  service.textContent = '';

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

  const serviceContacts = document.createElement('div');
  serviceContacts.classList.add('service__contacts');

  const servicePhone = document.createElement('a');
  servicePhone.classList.add('service__link', 'service__link_phone');
  servicePhone.textContent = `${phone}`;
  servicePhone.href = `tel:${phone}`;
  const serviceEmail = document.createElement('a');
  serviceEmail.classList.add('service__link', 'service__link_email');
  serviceEmail.textContent = `${email}`;
  serviceEmail.href = `mailto:${email}`;

  serviceContacts.append(servicePhone, serviceEmail);

  service.append(
    serviceAvatar,
    servicePresent,
    servicePrice,
    serviceReview,
    serviceContacts,
  );

  const aboutText = document.querySelector('.about__text');
  aboutText.textContent = `${about}`;
  aboutText.style.whiteSpace = 'pre-line';

  const reviewList = document.querySelector('.review__list');
  reviewList.textContent = '';

  if (comments.length === 0) {
    const noComments = document.createElement('p');
    noComments.textContent = 'Отзывов пока нет';
    reviewList.append(noComments);
  } else {
    const reviews = comments.map(createComment);
    reviewList.append(...reviews);
  }
};
