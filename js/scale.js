const SCALE_STEP = 25;
const scaleControl = document.querySelector('.scale');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const hiddenScale = document.querySelector('#hidden-scale');
const imagePreview = document.querySelector('.img-upload__preview img');

const setDefaultScale = () => {
  scaleValue.value = '100%';
  hiddenScale.value = '1';
  imagePreview.style.transform = `scale(${hiddenScale.value})`;
};

const reduceScale = () => {
  if (hiddenScale.value !== '0.25') {
    scaleValue.value = `${parseInt(scaleValue.value, 10) - SCALE_STEP}%`;
    hiddenScale.value = `${Number(hiddenScale.value) - 0.25}`;
    imagePreview.style.transform = `scale(${hiddenScale.value})`;
  }
};

const enlargeScale = () => {
  if (hiddenScale.value !== '1') {
    scaleValue.value = `${parseInt(scaleValue.value, 10) + SCALE_STEP}%`;
    hiddenScale.value = `${Number(hiddenScale.value) + 0.25}`;
    imagePreview.style.transform = `scale(${hiddenScale.value})`;
  }
};

scaleControl.addEventListener('click', (evt) => {
  if (evt.target === scaleSmaller) {
    reduceScale();
  }

  if (evt.target === scaleBigger) {
    enlargeScale();
  }
});

export {setDefaultScale, imagePreview};
