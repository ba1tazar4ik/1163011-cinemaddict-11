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
import {createStatisticsTemplate} from "./components/statistics";

const MAIN_FILMS_QUANTITY = 20;
const EXTRA_FILMS_QUANTITY = 2;
const SHOWING_FILMS_QUANTITY_AT_START = 5;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;

const getFilms = (films, firstFilm, lastFilm) => {
  return films.slice(firstFilm, lastFilm)
    .reduce((accumulator, currentValue) => {
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
render(siteMainElement, createMainContentTemplate(getFilms(films, 0, SHOWING_FILMS_QUANTITY_AT_START)));

const filmsSection = siteMainElement.querySelector(`.films`);
const mainFilmListContainer = filmsSection.querySelector(`.films-list__container`);

render(mainFilmListContainer, createShowMoreButtonTemplate(), `afterend`);

const showMoreButton = siteMainElement.querySelector(`.films-list__show-more`);
let showingFilmsCount = SHOWING_FILMS_QUANTITY_AT_START;

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += SHOWING_FILMS_QUANTITY_BY_BUTTON;
  render(mainFilmListContainer, getFilms(films, prevFilmsCount, showingFilmsCount));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

render(filmsSection, createExtraFilmsListTemplate(`Top rated`, getFilms(sortedByRatingFilms, 0, EXTRA_FILMS_QUANTITY)));
render(filmsSection, createExtraFilmsListTemplate(`Most commented`, getFilms(sortedByCommentsFilms, 0, EXTRA_FILMS_QUANTITY)));
render(siteFooterElement, createStatisticsTemplate(films));
// render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
