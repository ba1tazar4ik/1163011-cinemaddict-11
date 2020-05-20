import UserRating from "./components/user-rating.js";
import SiteMenu from "./components/site-menu.js";
import MainContent from "./components/main-content.js";
import FilmCard from "./components/film-card.js";
import ExtraFilmsList from "./components/extra-films-list.js";
import ShowMoreButton from "./components/show-more-button.js";
import {generateFilms} from "./mock/film.js";
import {generateUser} from "./mock/user.js";
import FilmDetails from "./components/film-details.js";
import {getRandomIntegerNumber, sortFilms, render, RenderPosition} from "./utils.js";
import Statistics from "./components/statistics.js";
import SortMenu from "./components/sort.js";
import MainContentNoData from "./components/main-content-no-data.js";

const MAIN_FILMS_QUANTITY = 20;
const EXTRA_FILMS_QUANTITY = 2;
const SHOWING_FILMS_QUANTITY_AT_START = 5;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer__statistics`);

const user = generateUser(getRandomIntegerNumber(0, MAIN_FILMS_QUANTITY));
const films = generateFilms(MAIN_FILMS_QUANTITY, user);
const sortedByRatingFilms = films.slice().sort(sortFilms(`rating`));
const sortedByCommentsFilms = films.slice().sort(sortFilms(`comments`));

render(siteHeaderElement, new UserRating(user).getElement(), `beforeend`);
render(siteMainElement, new SiteMenu(user).getElement(), `beforeend`);
render(siteMainElement, new SortMenu().getElement(), `beforeend`);

const mainContent = new MainContent();

render(siteMainElement, mainContent.getElement(), `beforeend`);

const filmsSection = mainContent.getElement();
const filmsListSection = filmsSection.querySelector(`.films-list`);
const mainFilmListContainer = filmsSection.querySelector(`.films-list__container`);

const renderFilm = (filmListElement, film) => {
  let filmDetailsComponent = null;

  const addFilmDetails = () => {
    bodyElement.appendChild(filmDetailsComponent.getElement());
  };

  const removeFilmDetails = () => {
    bodyElement.removeChild(filmDetailsComponent.getElement());
  };

  const filmCardComponent = new FilmCard(film);
  const elementsListForClick = filmCardComponent.getElement().querySelectorAll(`.film-card__title, .film-card__comments, .film-card__poster`);

  const escapeKeyDownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      removeFilmDetails();
      document.removeEventListener(`keydown`, escapeKeyDownHandler);
    }
  };

  elementsListForClick.forEach((current) => {
    current.addEventListener(`click`, () => {
      filmDetailsComponent = new FilmDetails(film);
      const closePopUPButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
      addFilmDetails();
      closePopUPButton.addEventListener(`click`, () => {
        removeFilmDetails();
      });

      document.addEventListener(`keydown`, escapeKeyDownHandler);
    });
  });

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderMainContent = (mainFilmsListElement, filmsData) => {
  let showingFilmsCount = SHOWING_FILMS_QUANTITY_AT_START;
  filmsData.slice(0, showingFilmsCount).forEach((film) =>{
    renderFilm(mainFilmsListElement, film);
  });
  const showMoreButton = new ShowMoreButton();
  render(filmsListSection, showMoreButton.getElement(), `beforeend`);

  showMoreButton.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += SHOWING_FILMS_QUANTITY_BY_BUTTON;

    filmsData.slice(prevFilmsCount, showingFilmsCount).forEach((film) =>{
      renderFilm(mainFilmsListElement, film);
    });

    if (showingFilmsCount >= filmsData.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });

  const topRatedList = new ExtraFilmsList(`Top rated`);
  const topRatedListContainer = topRatedList.getElement().querySelector(`.films-list__container`);

  render(filmsSection, topRatedList.getElement(), `beforeend`);

  sortedByRatingFilms.slice(0, EXTRA_FILMS_QUANTITY).forEach((film)=>{
    renderFilm(topRatedListContainer, film);
  });

  const mostCommentedList = new ExtraFilmsList(`Most commented`);
  const mostCommentedListContainer = mostCommentedList.getElement().querySelector(`.films-list__container`);

  render(filmsSection, mostCommentedList.getElement(), `beforeend`);

  sortedByCommentsFilms.slice(0, EXTRA_FILMS_QUANTITY).forEach((film)=>{
    renderFilm(mostCommentedListContainer, film);
  });
};

const renderMainContentNoData = (mainContentElement) =>{
  mainContentElement.getElement().querySelector(`.films-list`).replaceChild(new MainContentNoData().getElement(), mainContentElement.getElement().querySelector(`.films-list__title`))
};

if (films.length > 0) {
  renderMainContent(mainFilmListContainer, films);
} else {
  renderMainContentNoData(mainContent);
}
const filmsStatistics = new Statistics(films);
render(siteFooterElement, filmsStatistics.getElement(), `beforeend`);
