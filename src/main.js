import {createUserRatingTemplate} from "./components/user-rating.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createMainContentTemplate} from "./components/main-content";
import {createFilmCardTemplate} from "./components/film-card";
import {createExtraFilmsListTemplate} from "./components/extra-films-list";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {generateFilms} from "./mock/film";
import {generateUser} from "./mock/user";
import {createFilmDetailsTemplate} from "./components/film-details";
import {getSortedByRatingFilms} from "./utils";

const MAIN_FILMS_QUANTITY = 5;
const EXTRA_FILMS_QUANTITY = 2;

export const getFilmCards = (films) => {
  let filmCards = ``;
  for (let i = 0; i < films.length; i++) {
    filmCards += createFilmCardTemplate(films[i]);
  }
  return filmCards;
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const user = generateUser(5);
const films = generateFilms(5, user);
const sortedByRatingFilms = getSortedByRatingFilms(films);
// const sortedByCommentsFilms = getSortedFilms(`comments`, films);
console.log(sortedByRatingFilms);


render(siteHeaderElement, createUserRatingTemplate(user));
render(siteMainElement, createSiteMenuTemplate(user));
render(siteMainElement, createMainContentTemplate(getFilmCards(films)));

const filmsSection = siteMainElement.querySelector(`.films`);
const mainFilmListContainer = filmsSection.querySelector(`.films-list__container`);

render(mainFilmListContainer, createShowMoreButtonTemplate(), `afterend`);
render(filmsSection, createExtraFilmsListTemplate(`Top rated`, getFilmCards(sortedByRatingFilms.slice(0, 2))));
// render(filmsSection, createExtraFilmsListTemplate(`Most commented`, getFilmCards(sortedByCommentsFilms.slice(0, 2))));
// render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
