const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;
const MIN_COMMENTS_NUMBER = 1;
const MAX_COMMENTS_NUMBER = 4;
const MAX_PHOTOS_NUMBER = 25;

const PHOTO_ID_START = 1;
const PHOTO_ID_END = 25;
const URL_ID_START = 1;
const URL_ID_END = 25;
const AVATAR_NAUMBER_START = 1;
const AVATAR_NAUMBER_END = 6;

const DESCRIPTIONS = [
  'Короче, лекция — это то, что происходит в темноте: лектор делает вид, что пишет лекцию, а студенты делают вид, что записывают.',
  'Рандомный текст. И так, мои дорогие.',
  'Набалоболь : Набалоболить - это создать шумиху вокруг чего-то или кого-то.',
  'Короновирус: Если верить коронавирусу, то с 1 января 2020 года должно было рости население Земли до 4 млрд человек.',
];

const NAMES = [
  'Георгий',
  'Милана',
  'Максим',
  'Елена',
  'Марат',
  'Дарья',
  'Арина',
  'Вера',
  'Виктория',
  'Матвей',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


function getRandomIntInclusive(min = 10, max = 1000) {
  if (min === max) {
    return min;
  }

  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(100, 1000);

function commentLenghtCheck(comment = 'Какой-то комментария', maxCommentLength = 140) {
  return comment.length <= maxCommentLength;
}

commentLenghtCheck('Универсалии могут существовать как сущности конкретных вещей, или они являются лишь порождениями разума?', 140);

const usedCommentsIds = [];
const usedPhotoIds = [];
const usedUrlIds = [];
const commentIdStart = 1;
const commentIdEns = 1000;

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

const generateMessage = (messagesArray) => {
  const generatedMessages = [];

  for (let index = 0; index < getRandomIntInclusive(1, 2); index++) {
    generatedMessages.push(messagesArray[getRandomIntInclusive(0, messagesArray.length - 1)]);
  }

  return generatedMessages;
};

const generateComments = (minComments = 1, maxComments = 4) => {
  const commentsArray = [];

  for (let index = 1; index < getRandomIntInclusive(minComments, maxComments); index++) {

    commentsArray.push({
      id: generateNoRepeatIds(usedCommentsIds, commentIdStart, commentIdEns),
      avatar: `img/avatar-${getRandomIntInclusive(AVATAR_NAUMBER_START, AVATAR_NAUMBER_END)}.svg`,
      message: generateMessage(MESSAGES),
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
    });

  }

  return commentsArray;
};

const generatePhotos = (photoQuantity = 25) => {
  const photos = [];
  for (let index = 0; index < photoQuantity; index++) {
    photos.push ({
      id: generateNoRepeatIds(usedPhotoIds, PHOTO_ID_START, PHOTO_ID_END),
      url: `photos/${generateNoRepeatIds(usedUrlIds ,URL_ID_START, URL_ID_END)}.jpg`,
      description: DESCRIPTIONS[getRandomIntInclusive(0, DESCRIPTIONS.length - 1)],
      likes: getRandomIntInclusive(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
      comments: generateComments(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER),
    });
  }

  return photos;
};

generatePhotos(MAX_PHOTOS_NUMBER);
