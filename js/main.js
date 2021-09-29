function getRandomIntInclusive(min, max) {
  if (min < 0 || max < 0) {
    return  'Значения диапозона должны быть больше 0';
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(100, 1000);

function commentLenghtCheck(comment, maxCommentLength) {
  return comment.length < maxCommentLength;
}

commentLenghtCheck('Универсалии могут существовать как сущности конкретных вещей, или они являются лишь порождениями разума?', 140);
