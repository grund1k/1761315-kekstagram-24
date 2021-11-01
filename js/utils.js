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

export {stringLenghtCheck, getRandomIntInclusive, generateNoRepeatIds, isEscapeKey, addBodyModalOpen, removeBodyModalOpen};
