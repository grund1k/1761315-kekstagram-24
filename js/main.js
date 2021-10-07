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

const descriptions = [
  'Короче, лекция — это то, что происходит в темноте: лектор делает вид, что пишет лекцию, а студенты делают вид, что записывают.',
  'Рандомный текст. И так, мои дорогие.',
  'Набалоболь : Набалоболить - это создать шумиху вокруг чего-то или кого-то.',
  'Короновирус: Если верить коронавирусу, то с 1 января 2020 года должно было рости население Земли до 4 млрд человек.',
];

const names = [
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

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;

const generateInOrderArray = (arrayName = [], maxLength = 25) => {
  for (let index = 1; index <= maxLength; index++) {
    arrayName.push(index);
  }

  return arrayName;
};

const ids = generateInOrderArray();
const urls = generateInOrderArray();

const maxComments = 4;
const usedCommentsIds = [];
const usedPhotoIds = [];
const usedUrlIds = [];
const photoIdStart = 1;
const photoIdEnd = 25;
const urlIdStart = 1;
const urlIdEnd = 25;
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

const generateComments = () => {
  const commentsArray = [];

  for (let index = 1; index < getRandomIntInclusive(1, maxComments); index++) {

    commentsArray.push({
      id: generateNoRepeatIds(usedCommentsIds, commentIdStart, commentIdEns),
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
      message: generateMessage(messages),
      name: names[getRandomIntInclusive(0, names.length - 1)],
    });

  }

  return commentsArray;
};

const generatePhotos = (photoQuantity = 25) => {
  const photos = [];
  for (let index = 0; index < photoQuantity; index++) {
    photos.push ({
      id: generateNoRepeatIds(usedPhotoIds, photoIdStart, photoIdEnd),
      url: `photos/${generateNoRepeatIds(usedUrlIds ,urlIdStart, urlIdEnd)}.jpg`,
      description: descriptions[getRandomIntInclusive(0, descriptions.length - 1)],
      likes: getRandomIntInclusive(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
      comments: generateComments(),
    });
  }

  console.log(photos);
  return photos;
};

generatePhotos();
