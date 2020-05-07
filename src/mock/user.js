import {getArrayOfUniqElements, getRandomIntegerNumber} from "../utils";
import {filmTitles} from "../const";

const generateUserRating = (array) => {
  let rating = ``;

  switch (true) {
    case array.length === 0:
      rating = ``;
      break;
    case array.length > 0 && array.length < 11 :
      rating = `novice`;
      break;
    case array.length > 10 && array.length < 21 :
      rating = `fan`;
      break;
    case array.length > 20:
      rating = `movie buff`;
      break;
  }

  return rating;
};

export const generateUser = (quantity) => {
  const history = getArrayOfUniqElements(filmTitles, getRandomIntegerNumber(0, quantity));

  return {
    history,
    watchlist: getArrayOfUniqElements(filmTitles, getRandomIntegerNumber(0, quantity)),
    favorites: getArrayOfUniqElements(filmTitles, getRandomIntegerNumber(0, quantity)),
    rating: generateUserRating(history),
  };
};

