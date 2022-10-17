export const commentsController = () => {
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
};
