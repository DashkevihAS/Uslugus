import { CustomError } from './customError';

export const postData = async (url, data, method = 'POST') => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
    });
    if (response.ok && response.status !== 404) {
      return await response.json();
    } else {
      throw new CustomError(response.json());
    }
  } catch (error) {
    return error.data || error;
  }
};
