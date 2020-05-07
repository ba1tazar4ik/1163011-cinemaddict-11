import UserRating from "./components/user-rating.js";
import SiteMenu from "./components/site-menu.js";
import MainContent from "./components/main-content";
import FilmCard from "./components/film-card";
import ExtraFilmsList from "./components/extra-films-list";
import ShowMoreButton from "./components/show-more-button";
import {generateFilms} from "./mock/film";
import {generateUser} from "./mock/user";
import FilmDetails from "./components/film-details";
import {getRandomIntegerNumber, sortFilms, render, RenderPosition} from "./utils";
import Statistics from "./components/statistics";
import SortMenu from "./components/sort";

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

  elementsListForClick.forEach((current) => {
    current.addEventListener(`click`, () => {
      filmDetailsComponent = new FilmDetails(film);
      const closePopUPButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
      addFilmDetails();
      closePopUPButton.addEventListener(`click`, () => {
        removeFilmDetails();
      });
    });
  });

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderMainContent = (mainContentElement, filmsData) => {
  let showingFilmsCount = SHOWING_FILMS_QUANTITY_AT_START;
  filmsData.slice(0, showingFilmsCount).forEach((film) =>{
    renderFilm(mainContentElement, film);
  });
  const showMoreButton = new ShowMoreButton();
  render(filmsListSection, showMoreButton.getElement(), `beforeend`);

  showMoreButton.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += SHOWING_FILMS_QUANTITY_BY_BUTTON;

    filmsData.slice(prevFilmsCount, showingFilmsCount).forEach((film) =>{
      renderFilm(mainContentElement, film);
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

renderMainContent(mainFilmListContainer, films);
const filmsStatistics = new Statistics(films);
render(siteFooterElement, filmsStatistics.getElement(), `beforeend`);
