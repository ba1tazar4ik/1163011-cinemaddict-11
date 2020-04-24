import {filmTitlesAndPosters} from "../const.js";
import {getRandomArrayItem} from "../utils";

const {titles, posters, year, duration, genre} = filmTitlesAndPosters;

const generateFilm = () => {
  const filmRating = Math.random() * (0 - 10);
  const filmDuration = getRandomArrayItem(duration);

  return {
    filmTitle: getRandomArrayItem(titles),
    filmRating,
    filmYear: year,
    filmDurationHours: filmDuration.hours ? filmDuration.hours + `h` : ``,
    filmDurationMins: filmDuration.mins ? filmDuration.mins + `m` : ``,
    filmGenre: getRandomArrayItem(genre),
    filmPoster: getRandomArrayItem(posters),
  };
};
export const generateFilms = (count) =>{
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
