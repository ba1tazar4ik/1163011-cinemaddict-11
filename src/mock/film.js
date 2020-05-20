import {filmTitles, filmPosters, filmGenres, filmDescription, filmAges, names, filmCountry} from "../const.js";
import {getRandomArrayItem, getRandomIntegerNumber, getArrayOfUniqElements, getRandomDate} from "../utils/common.js";
import {generateComments} from "./comment.js";

const filmDescriptions = filmDescription.split(`.`);

const generateFilm = (userData) => {
  const title = getRandomArrayItem(filmTitles);
  const rating = Math.floor(Math.random() * 100) / 10;
  const description = getArrayOfUniqElements(filmDescriptions, getRandomIntegerNumber(1, 5)).join(` `);
  const writers = getArrayOfUniqElements(names, getRandomIntegerNumber(1, 3)).join(`, `);
  const actors = getArrayOfUniqElements(names, getRandomIntegerNumber(1, 3)).join(`, `);

  return {
    title,
    originalTitle: getRandomArrayItem(filmTitles),
    rating,
    date: getRandomDate(),
    duration: getRandomIntegerNumber(10, 180),
    country: getRandomArrayItem(filmCountry),
    genre: getArrayOfUniqElements(filmGenres, getRandomIntegerNumber(1, 3)),
    age: getRandomArrayItem(filmAges),
    poster: getRandomArrayItem(filmPosters),
    description,
    director: getRandomArrayItem(names),
    writers,
    actors,
    comments: generateComments(getRandomIntegerNumber(0, 5)),
    isWatchlist: userData.watchlist.includes(title),
    isHistory: userData.history.includes(title),
    isFavorites: userData.favorites.includes(title),
  };
};

export const generateFilms = (count, userData) =>{
  return new Array(count)
    .fill(``)
    .map(() => generateFilm(userData));
};
