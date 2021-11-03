import {isEscapeKey, addBodyModalOpen, removeBodyModalOpen} from './utils.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureTag = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsNumber = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureComment = commentsContainer.querySelector('.social__comment');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const clearComments = () => {
  commentsContainer.innerHTML = '';
};

clearComments();

const getComments = (comment) => {
  const bigPictureCommentFragment = bigPictureComment.cloneNode(true);
  bigPictureCommentFragment.querySelector('.social__picture').src = `${comment.avatar}`;
  bigPictureCommentFragment.querySelector('.social__picture').alt = `${comment.name}`;
  bigPictureCommentFragment.querySelector('.social__text').textContent = `${comment.message}`;
  commentsContainer.append(bigPictureCommentFragment);
};

const renderBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  addBodyModalOpen();

  bigPictureTag.src = `${picture.url}`;
  likesCount.textContent = `${picture.likes}`;
  commentsNumber.textContent = `${picture.comments.length}`;
  bigPictureDescription.textContent = `${picture.description}`;

  picture.comments.forEach(getComments);
};

const onPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (evt, picture) => {
  evt.preventDefault();
  renderBigPicture(picture);

  document.addEventListener('keydown', onPictureEscKeydown);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  removeBodyModalOpen();
  clearComments();

  document.removeEventListener('keydown', onPictureEscKeydown);
}

bigPictureCloseButton.addEventListener('click', closeBigPicture);

export {renderBigPicture, openBigPicture};
