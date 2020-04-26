import {filmTitles, filmPosters, filmGenres, filmDescriptions, filmAges, names, filmCountry} from "../const.js";
import {getRandomArrayItem, getRandomIntegerNumber, getArrayOfUniqElements} from "../utils";

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = -1 * getRandomIntegerNumber(0, 10000);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateFilm = () => {
  const rating = Math.floor(Math.random() * 100) / 10;
  const age = getRandomArrayItem(filmAges) + `+`;
  const description = getArrayOfUniqElements(filmDescriptions, getRandomIntegerNumber(1, 5)).join(` `);
  const writers = getArrayOfUniqElements(names, getRandomIntegerNumber(1, 3)).join(`, `);
  const actors = getArrayOfUniqElements(names, getRandomIntegerNumber(1, 3)).join(`, `);

  return {
    title: getRandomArrayItem(filmTitles),
    originalTitle: getRandomArrayItem(filmTitles),
    rating,
    date: getRandomDate(),
    duration: getRandomIntegerNumber(10, 180),
    country: getRandomArrayItem(filmCountry),
    genre: getArrayOfUniqElements(filmGenres, getRandomIntegerNumber(1, 3)),
    age,
    poster: getRandomArrayItem(filmPosters),
    description,
    director: getRandomArrayItem(names),
    writers,
    actors,
  };
};

export const generateFilms = (count) =>{
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
