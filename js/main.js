import {generatePhotos, addFilters} from './thumbnail-render.js';
import {setImageFormSubmit, closeUploadedImage} from './form.js';
import {getData} from './api.js';
import {showLoadAlert} from './alert-message.js';
import {debounce} from './utils.js';

getData(
  (photos) => {
    generatePhotos(photos);
    addFilters(photos, debounce(generatePhotos));
  },
  () => showLoadAlert('Проблемы с загрузкой контента, попробуйте обновить страницу'),
);

setImageFormSubmit(closeUploadedImage);
