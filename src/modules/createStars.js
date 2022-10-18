import starSVG from '../img/star.png';
import starOSVG from '../img/star-o.png';

export const createStars = (comments, rating = '') => {
  let stars = Array.isArray(comments)
    ? Math.round(
        comments.reduce((acc, item) => +item.stars + acc, 0) / comments.length,
      ) || 0
    : comments;

  if (rating) {
    stars = rating;
  }

  const wrapper = document.createElement('div');
  wrapper.classList.add('service__stars');

  for (let i = 0; i < 5; i++) {
    const star = document.createElement('img');
    star.classList.add('service__star');

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
  return wrapper;
};
