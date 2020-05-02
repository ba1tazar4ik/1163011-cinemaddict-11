import {filmTitles, filmPosters, filmGenres, filmDescription, filmAges, names, filmCountry} from "../const.js";
import {getRandomArrayItem, getRandomIntegerNumber, getArrayOfUniqElements, getRandomDate} from "../utils";
import {generateComments} from "./comment";

const filmDescriptions = filmDescription.split(`.`);

const generateFilm = (filmData) => {
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
    isWatchlist: filmData.watchlist.includes(title),
    isHistory: filmData.history.includes(title),
    isFavorites: filmData.favorites.includes(title),
  };
};

export const generateFilms = (count, filmData) =>{
  return new Array(count)
    .fill(``)
    .map(() => generateFilm(filmData));
};
