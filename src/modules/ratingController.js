export const ratingController = () => {
  const starsBlock = document.querySelector('.rating');
  const ratingInput = document.querySelector('.rating__input');

  // currentTarget  - элемент, который является инициаторорм события
  starsBlock.addEventListener('click', ({ target, currentTarget }) => {
    // получаем звезы через target.closest,
    // тк клик на SVG и по факту клик будет на path в SVG
    // вот  и берем родителя path через closest
    const star = target.closest('.rating__star');
    if (star) {
      currentTarget.dataset.stars = star.dataset.rating;
      ratingInput.value = star.dataset.rating;
    }
  });
};
