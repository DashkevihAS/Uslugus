import Croppie from 'croppie';
import 'croppie/croppie.css';

export const avatarController = ({ inputFile, uploadResult }) => {
  const avatarBlock = document.querySelector(uploadResult);
  const upload = document.querySelector(inputFile);

  avatarBlock.style.display = 'none';

  const crp = new Croppie(avatarBlock, {
    boundary: { width: 300, height: 300 },
    viewport: { width: 200, height: 200, type: 'circle' },
  });

  const readFile = ({ target: input }) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        avatarBlock.style.display = 'block';
        crp.bind({ url: e.target.result });
      });
      reader.readAsDataURL(input.files[0]);
    }
  };

  upload.addEventListener('change', readFile);

  return crp;
};
