const commentLenghtCheck = (comment = 'Какой-то комментария', maxCommentLength = 140) => comment.length <= maxCommentLength;

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

export {commentLenghtCheck, getRandomIntInclusive, generateNoRepeatIds};
