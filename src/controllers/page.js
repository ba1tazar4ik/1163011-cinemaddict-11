import FilmCard from "../components/film-card.js";
import FilmDetails from "../components/film-details.js";
import {remove, render, RenderPosition, replace} from "../utils/render.js";
import ShowMoreButton from "../components/show-more-button.js";
import ExtraFilmsList from "../components/extra-films-list.js";
import MainContentNoData from "../components/main-content-no-data.js";
import {sortFilms} from "../utils/common.js";

const EXTRA_FILMS_QUANTITY = 2;
const SHOWING_FILMS_QUANTITY_AT_START = 5;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;

const bodyElement = document.querySelector(`body`);

const renderFilm = (filmListElement, film) => {
  let filmDetailsComponent = null;

  const addFilmDetails = () => {
    bodyElement.appendChild(filmDetailsComponent.getElement());
  };

  const removeFilmDetails = () => {
    bodyElement.removeChild(filmDetailsComponent.getElement());
  };

  const escapeKeyDownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      removeFilmDetails();
      document.removeEventListener(`keydown`, escapeKeyDownHandler);
    }
  };

  const filmCardComponent = new FilmCard(film);

  render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);

  filmCardComponent.setClickHandler(() => {
    filmDetailsComponent = new FilmDetails(film);
    addFilmDetails();
    filmDetailsComponent.setClickHandler(() => {
      removeFilmDetails();
    });

    document.addEventListener(`keydown`, escapeKeyDownHandler);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._mainContentNoData = new MainContentNoData();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._topRatedListComponent = new ExtraFilmsList(`Top rated`);
    this._mostCommentedListComponent = new ExtraFilmsList(`Most commented`);
  }

  render(films) {
    const filmsSection = this._container.getElement();
    const filmsListSection = filmsSection.querySelector(`.films-list`);
    const mainFilmListContainer = filmsSection.querySelector(`.films-list__container`);
    const sortedByRatingFilms = films.slice().sort(sortFilms(`rating`));
    const sortedByCommentsFilms = films.slice().sort(sortFilms(`comments`));

    const renderMainContentNoData = (mainContentElement) => {
      replace(this._mainContentNoData, mainContentElement);
    };

    if (films.length <= 0) {
      renderMainContentNoData(this._container);
      return;
    }

    let showingFilmsCount = SHOWING_FILMS_QUANTITY_AT_START;
    films.slice(0, showingFilmsCount).forEach((film) => {
      renderFilm(mainFilmListContainer, film);
    });

    render(filmsListSection, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount += SHOWING_FILMS_QUANTITY_BY_BUTTON;

      films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
        renderFilm(mainFilmListContainer, film);
      });

      if (showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    const topRatedListContainer = this._topRatedListComponent.getElement().querySelector(`.films-list__container`);

    render(filmsSection, this._topRatedListComponent, RenderPosition.BEFOREEND);

    sortedByRatingFilms.slice(0, EXTRA_FILMS_QUANTITY).forEach((film) => {
      renderFilm(topRatedListContainer, film);
    });

    const mostCommentedListContainer = this._mostCommentedListComponent.getElement().querySelector(`.films-list__container`);

    render(filmsSection, this._mostCommentedListComponent, RenderPosition.BEFOREEND);

    sortedByCommentsFilms.slice(0, EXTRA_FILMS_QUANTITY).forEach((film) => {
      renderFilm(mostCommentedListContainer, film);
    });
  }
}
