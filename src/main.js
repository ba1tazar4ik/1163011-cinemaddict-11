import {createUserRatingTemplate} from "./components/user-rating.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createMainContentTemplate} from "./components/main-content";
import {createFilmCardTemplate} from "./components/film-card";
import {createExtraFilmsListTemplate} from "./components/extra-films-list";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {createFilmDetailsTemplate} from "./components/film-details";

const MAIN_FILMS_QUANTITY = 5;
const EXTRA_FILMS_QUANTITY = 2;

const getFilmCards = (quantity) => {
  let filmCards = ``;
  for (let i = 0; i < quantity; i++) {
    filmCards += createFilmCardTemplate();
  }
  return filmCards;
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserRatingTemplate());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createMainContentTemplate(getFilmCards(MAIN_FILMS_QUANTITY)));

const filmsSection = siteMainElement.querySelector(`.films`);
const mainFilmListContainer = filmsSection.querySelector(`.films-list__container`);

render(mainFilmListContainer, createShowMoreButtonTemplate(), `afterend`);
render(filmsSection, createExtraFilmsListTemplate(`Top rated`, getFilmCards(EXTRA_FILMS_QUANTITY)));
render(filmsSection, createExtraFilmsListTemplate(`Most commented`, getFilmCards(EXTRA_FILMS_QUANTITY)));
// render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
