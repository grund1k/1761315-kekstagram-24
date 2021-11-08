import {generatePhotos} from './thumbnail-render.js';
import {setImageFormSubmit, closeUploadedImage} from './form.js';
import {getData} from './api.js';
import {showLoadAlert} from './alert-message.js';

getData(
  (photos) => generatePhotos(photos),
  () => showLoadAlert('Проблемы с загрузкой контента, попробуйте обновить страницу'),
);

setImageFormSubmit(closeUploadedImage);
