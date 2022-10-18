import { postData } from './postData';
import { API_URL } from './const';
import { renderList } from './renderList';

export const commentController = ({ id }, callback) => {
  const form = document.querySelector('.form_add-review');
  const button = form.querySelector('.form__submit');
  const wrapper = form.querySelector('.form__wrapper-send-review');

  const errorList = document.createElement('ul');
  errorList.style.listStyle = 'circle';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorList.textContent = '';
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const dataResponse = await postData(
      `${API_URL}/api/service/comment/${id}`,
      data,
    );

    if (dataResponse.errors) {
      const errors = dataResponse.errors.map((errObj) => {
        const error = document.createElement('li');
        error.style.fontWeight = '300';
        error.style.fontSize = '14px';
        error.style.color = 'red';
        error.textContent = errObj.message;
        return error;
      });
      errorList.append(...errors);
      wrapper.insertBefore(errorList, wrapper.firstChild);
      return;
    }

    form.reset();
    renderList();
    callback(e);
  });
};
