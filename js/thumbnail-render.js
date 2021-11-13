import {openBigPicture} from './full-picture-render.js';
import {getRandomIntInclusive} from './utils.js';

const RANDOM_PICTURE_COUNT = 10;

const thumbnail = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');
const thumbnailFragment = document.createDocumentFragment();
const imageFilter = document.querySelector('.img-filters');
const imageFilterForm = imageFilter.querySelector('.img-filters__form');
const imageFilterButtons = imageFilterForm.querySelectorAll('.img-filters__button');

const generatePhotos = (photos) => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((element) => element.remove());

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
  imageFilter.classList.remove('img-filters--inactive');
};

const sortPictures = (array, value) => array.slice().sort((firstElement, secondElement) => secondElement[value].length - firstElement[value].length);

const getRandomPictures = (array, count) => array.slice().sort(() => getRandomIntInclusive(0, array.length) - getRandomIntInclusive(0, array.length)).slice(0, count);

const addFilters = (data, render) => {
  imageFilterForm.addEventListener('click', (evt) => {
    imageFilterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    let newData = data;

    if (evt.target.id === 'filter-random') {
      newData = getRandomPictures(newData, RANDOM_PICTURE_COUNT);
    }

    if (evt.target.id === 'filter-discussed') {
      newData = sortPictures(newData, 'comments');
    }

    if (evt.target.id === 'filter-default') {
      newData = data;
    }

    evt.target.classList.add('img-filters__button--active');
    render(newData);
  });
};


export {generatePhotos, addFilters};
