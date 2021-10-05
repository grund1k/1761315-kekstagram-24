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
