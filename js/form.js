import {stringLenghtCheck, isEscapeKey, addBodyModalOpen, removeBodyModalOpen} from './utils.js';
import {setDefaultScale} from './scale.js';
import {setDefaultFilter} from './slider.js';
import {sendData} from './api.js';
import {renderSuccessMessage, renderErrorMessage} from './alert-message.js';

const MAX_HASHTAGS_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const imageForm = document.querySelector('#upload-select-image');
const photoUploadOverlay = imageForm.querySelector('.img-upload__overlay');
const photoUploadForm = imageForm.querySelector('#upload-file');
const photoUploadFormClose = imageForm.querySelector('#upload-cancel');
const hashtagInput = imageForm.querySelector('.text__hashtags');
const descriptionInput = imageForm.querySelector('.text__description');

const validateHashTags = () => {
  const hashtags = hashtagInput.value.toLowerCase().split(' ');
  const isRepeat = hashtags.some((item) => hashtags.indexOf(item) !== hashtags.lastIndexOf(item));

  if (hashtags.length > MAX_HASHTAGS_NUMBER) {
    hashtagInput.setCustomValidity(`Количество хештегов привышено, удалите ${hashtags.length - MAX_HASHTAGS_NUMBER} любой тег!`);
  } else if (isRepeat) {
    hashtagInput.setCustomValidity('Хештеги не должны повторятся!');
  } else {
    hashtags.forEach((hashtag) => {
      if (!HASHTAG_REGEX.test(hashtag) && hashtagInput.value !== '') {
        hashtagInput.setCustomValidity('Хэш-тег начинается с символа #, не может состоять только из одной решётки, содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. и привышать 20 символов');
      } else {
        hashtagInput.setCustomValidity('');
      }
    });
  }

  hashtagInput.reportValidity();
};

const validateDescription = () => {
  const description = descriptionInput.value;

  if (!stringLenghtCheck(description, MAX_COMMENT_LENGTH)) {
    descriptionInput.setCustomValidity(`Максимальное возможное количество символом ${MAX_COMMENT_LENGTH}, удалите ${description.length - MAX_COMMENT_LENGTH} символов`);
  } else {
    descriptionInput.setCustomValidity('');
  }

  descriptionInput.reportValidity();
};

const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadedImage();
  }
};

const openUploadedImage = () => {
  photoUploadOverlay.classList.remove('hidden');
  addBodyModalOpen();

  photoUploadFormClose.addEventListener('click', () => {
    closeUploadedImage();
  });

  setDefaultScale();
  setDefaultFilter();
  hashtagInput.addEventListener('input', validateHashTags);
  descriptionInput.addEventListener('input', validateDescription);
  document.addEventListener('keydown', onPhotoEscKeydown);
};


function closeUploadedImage () {
  photoUploadOverlay.classList.add('hidden');
  removeBodyModalOpen();
  photoUploadForm.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';

  photoUploadFormClose.removeEventListener('click', () => {
    closeUploadedImage();
  });

  hashtagInput.removeEventListener('input', validateHashTags);
  descriptionInput.removeEventListener('input', validateDescription);
  document.removeEventListener('keydown', onPhotoEscKeydown);
}

photoUploadForm.addEventListener('change', () => {
  openUploadedImage();
});

hashtagInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

descriptionInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const setImageFormSubmit = (onSuccess) => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => renderSuccessMessage(),
      () => renderErrorMessage(),
      new FormData(evt.target),
    );

    onSuccess();
  });
};

export {setImageFormSubmit, closeUploadedImage};
