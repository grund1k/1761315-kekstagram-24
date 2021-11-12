const DEBOUNCE_DELAY = 500;

const stringLenghtCheck = (someString = 'Какой-то комментария', maxStringLength = 140) => someString.length <= maxStringLength;

const getRandomIntInclusive = (min = 10, max = 1000) => {

  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateNoRepeatIds = (usedIdsArray = [], idStart = 1, idEnd = 25) => {
  let id = getRandomIntInclusive(idStart, idEnd);

  while (usedIdsArray.includes(id)) {
    id = getRandomIntInclusive(idStart, idEnd);

    if (!usedIdsArray.includes(id)) {
      break;
    }
  }

  usedIdsArray.push(id);

  return id;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const body = document.querySelector('body');

const addBodyModalOpen = () => {
  body.classList.add('modal-open');
};

const removeBodyModalOpen = () => {
  body.classList.remove('modal-open');
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {stringLenghtCheck, getRandomIntInclusive, generateNoRepeatIds, isEscapeKey, addBodyModalOpen, removeBodyModalOpen, debounce};
