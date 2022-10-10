import starSVG from '../img/star.png';
import starOSVG from '../img/star-o.png';

export const createComment = (obj) => {
  const { name, stars, text } = obj;
  const reviewItem = document.createElement('li');
  reviewItem.classList.add('review__item');

  const reviewName = document.createElement('h4');
  reviewName.classList.add('review__name');
  reviewName.textContent = `${name}`;

  const wrapper = document.createElement('div');
  wrapper.classList.add('review__stars', 'stars');

  for (let i = 0; i < 5; i++) {
    const star = document.createElement('img');
    star.classList.add('stars__item');

    if (i === 0) {
      star.alt = `рейтинг специалиста ${stars} из 5`;
    } else {
      star.alt = '';
    }

    if (stars > i) {
      star.src = starSVG;
    } else {
      star.src = starOSVG;
    }

    wrapper.append(star);
  }

  const reviewText = document.createElement('p');
  reviewText.classList.add('review__text');
  reviewText.textContent = `${text}`;

  reviewItem.append(reviewName, wrapper, reviewText);
  return reviewItem;
};
