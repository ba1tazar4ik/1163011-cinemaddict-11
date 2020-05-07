import {months} from "./const";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const shuffle = (array) => {
  let j = 0;
  let temp = [];
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};


export const getRandomDate = () => {
  const currentDate = new Date();
  const diffValue = -1 * getRandomIntegerNumber(0, 10000);

  currentDate.setDate(currentDate.getDate() + diffValue);

  return currentDate;
};

export const formatFilmDate = (date) => {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${day} ${month} ${year} ${hours}:${mins}`;
};

export const formatCommentDate = (date) => {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};

export const formatDuration = (durationInMin) => {
  const hours = Math.trunc(durationInMin / 60);
  const minutes = durationInMin % 60;

  return hours > 0 ? `${hours}h ` + `${minutes}m` : `${minutes}m`;
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getArrayOfUniqElements = (array, count) => {
  const incomingArray = shuffle(array.slice());
  const arrayLength = count > incomingArray.length ? incomingArray.length : count;
  return incomingArray.slice(0, arrayLength);
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const sortFilms = (field) => {
  return (a, b) => a[field] < b[field] ? 1 : -1;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
