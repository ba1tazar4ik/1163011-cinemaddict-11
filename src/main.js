import {createUserRatingTemplate} from "./components/user-rating.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createMainContentTemplate} from "./components/main-content";
import {createFilmCardTemplate} from "./components/film-card";
import {createExtraFilmsListTemplate} from "./components/extra-films-list";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {generateFilms} from "./mock/film";
import {createFilmDetailsTemplate} from "./components/film-details";

const MAIN_FILMS_QUANTITY = 5;
const EXTRA_FILMS_QUANTITY = 2;

const getFilmCards = (films) => {
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
const films = generateFilms(5);

render(siteHeaderElement, createUserRatingTemplate());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createMainContentTemplate(getFilmCards(films)));

const filmsSection = siteMainElement.querySelector(`.films`);
const mainFilmListContainer = filmsSection.querySelector(`.films-list__container`);

render(mainFilmListContainer, createShowMoreButtonTemplate(), `afterend`);
render(filmsSection, createExtraFilmsListTemplate(`Top rated`, getFilmCards(EXTRA_FILMS_QUANTITY)));
render(filmsSection, createExtraFilmsListTemplate(`Most commented`, getFilmCards(EXTRA_FILMS_QUANTITY)));
render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
