import FilmCard from "../components/film-card.js";
import FilmDetails from "../components/film-details.js";
import {remove, render, RenderPosition, replace} from "../utils/render.js";
import ShowMoreButton from "../components/show-more-button.js";
import ExtraFilmsList from "../components/extra-films-list.js";
import MainContentNoData from "../components/main-content-no-data.js";
import {sortFilms} from "../utils/common.js";
import SortMenu, {SortType} from "../components/sort-menu";
import SiteMenu from "../components/site-menu";

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
      document.removeEventListener(`keydown`, escapeKeyDownHandler);
    });

    document.addEventListener(`keydown`, escapeKeyDownHandler);
  });
};

const renderFilms = (mainFilmListContainer, films) => {
  films.forEach((film) => {
    renderFilm(mainFilmListContainer, film);
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedFilms = showingFilms.sort((a, b) => b.date - a.date);
      break;
    case SortType.RATING_UP:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortMenu();
    this._mainContentNoData = new MainContentNoData();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._topRatedListComponent = new ExtraFilmsList(`Top rated`);
    this._mostCommentedListComponent = new ExtraFilmsList(`Most commented`);
  }

  render(siteMainElement, films, user) {

    render(siteMainElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(siteMainElement, new SiteMenu(user), RenderPosition.AFTERBEGIN);

    const filmsSection = this._container.getElement();
    const filmsListSection = filmsSection.querySelector(`.films-list`);
    const mainFilmListContainer = filmsSection.querySelector(`.films-list__container`);
    const sortedByRatingFilms = films.slice().sort(sortFilms(`rating`));
    const sortedByCommentsFilms = films.slice().sort(sortFilms(`comments`));

    const renderMainContentNoData = (mainContentElement) => {
      replace(this._mainContentNoData, mainContentElement);
    };

    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      render(filmsListSection, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_QUANTITY_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, showingFilmsCount);

        renderFilms(mainFilmListContainer, sortedFilms);

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    if (films.length <= 0) {
      renderMainContentNoData(this._container);
      return;
    }

    let showingFilmsCount = SHOWING_FILMS_QUANTITY_AT_START;
    renderFilms(mainFilmListContainer, films.slice(0, showingFilmsCount));
    renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_QUANTITY_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      mainFilmListContainer.innerHTML = ``;

      renderFilms(mainFilmListContainer, sortedFilms);
      renderShowMoreButton();
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
