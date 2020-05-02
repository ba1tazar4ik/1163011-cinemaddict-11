import {createUserRatingTemplate} from "./components/user-rating.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createMainContentTemplate} from "./components/main-content";
import {createFilmCardTemplate} from "./components/film-card";
import {createExtraFilmsListTemplate} from "./components/extra-films-list";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {generateFilms} from "./mock/film";
import {generateUser} from "./mock/user";
import {createFilmDetailsTemplate} from "./components/film-details";
import {getRandomIntegerNumber, sortFilms} from "./utils";

const MAIN_FILMS_QUANTITY = 5;
const EXTRA_FILMS_QUANTITY = 2;

export const getFilmCards = (films) => {
  films.reduce((accumulator, currentValue) => {
    return accumulator + createFilmCardTemplate(currentValue);
  }, ``);
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const user = generateUser(getRandomIntegerNumber(0, MAIN_FILMS_QUANTITY));
const films = generateFilms(MAIN_FILMS_QUANTITY, user);
const sortedByRatingFilms = films.slice().sort(sortFilms(`rating`));
const sortedByCommentsFilms = films.slice().sort(sortFilms(`comments`));


render(siteHeaderElement, createUserRatingTemplate(user));
render(siteMainElement, createSiteMenuTemplate(user));
render(siteMainElement, createMainContentTemplate(getFilmCards(films)));

const filmsSection = siteMainElement.querySelector(`.films`);
const mainFilmListContainer = filmsSection.querySelector(`.films-list__container`);

render(mainFilmListContainer, createShowMoreButtonTemplate(), `afterend`);
render(filmsSection, createExtraFilmsListTemplate(`Top rated`, getFilmCards(sortedByRatingFilms.slice(0, EXTRA_FILMS_QUANTITY))));
render(filmsSection, createExtraFilmsListTemplate(`Most commented`, getFilmCards(sortedByCommentsFilms.slice(0, EXTRA_FILMS_QUANTITY))));
// render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
