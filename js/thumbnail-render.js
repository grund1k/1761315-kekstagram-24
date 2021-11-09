import {openBigPicture} from './full-picture-render.js';

const thumbnail = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');
const thumbnailFragment = document.createDocumentFragment();

const generatePhotos = (photos) => {
  photos.forEach((photo) => {
    const thumbnailElement = thumbnail.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = `${photo.url}`;
    thumbnailElement.querySelector('.picture__likes').textContent = `${photo.likes}`;
    thumbnailElement.querySelector('.picture__comments').textContent = `${photo.comments.length}`;
    thumbnailFragment.appendChild(thumbnailElement);

    thumbnailElement.addEventListener('click', (evt) => {
      openBigPicture(evt, photo);
    });
  });

  thumbnailContainer.appendChild(thumbnailFragment);
};

export {generatePhotos};
