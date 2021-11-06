import {isEscapeKey, addBodyModalOpen, removeBodyModalOpen} from './utils.js';

const MAX_ADDIBLE_COMMENTS = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureTag = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count--number');
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
  bigPictureCommentFragment.classList.add('hidden');
  bigPictureCommentFragment.querySelector('.social__picture').src = `${comment.avatar}`;
  bigPictureCommentFragment.querySelector('.social__picture').alt = `${comment.name}`;
  bigPictureCommentFragment.querySelector('.social__text').textContent = `${comment.message}`;
  commentsContainer.append(bigPictureCommentFragment);
};

const showComments = () => {
  const hiddenComments = commentsContainer.querySelectorAll('.social__comment.hidden');
  Array.from(hiddenComments).slice(0, MAX_ADDIBLE_COMMENTS).forEach((comment) => comment.classList.remove('hidden'));
  const allCommnets = commentsContainer.querySelectorAll('.social__comment');
  const allOpenedComments = commentsContainer.querySelectorAll('.social__comment:not(.hidden)');
  commentsCount.textContent = allOpenedComments.length;

  if (allCommnets.length === allOpenedComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  addBodyModalOpen();

  bigPictureTag.src = `${picture.url}`;
  likesCount.textContent = `${picture.likes}`;
  commentsNumber.textContent = `${picture.comments.length}`;
  bigPictureDescription.textContent = `${picture.description}`;

  picture.comments.forEach(getComments);
  showComments();
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

  commentsLoader.addEventListener('click', showComments);
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  removeBodyModalOpen();
  clearComments();

  document.removeEventListener('keydown', onPictureEscKeydown);

  commentsLoader.removeEventListener('click', showComments);
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
}

export {renderBigPicture, openBigPicture};
