import {remove, render, RenderPosition, replace} from "../utils/render.js";
import ShowMoreButton from "../components/show-more-button.js";
import ExtraFilmsList from "../components/extra-films-list.js";
import MainContentNoData from "../components/main-content-no-data.js";
import {sortFilms} from "../utils/common.js";
import SortMenu, {SortType} from "../components/sort-menu";
import SiteMenu from "../components/site-menu";
import MovieController from "./movie";

const EXTRA_FILMS_QUANTITY = 2;
const SHOWING_FILMS_QUANTITY_AT_START = 5;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;

const renderFilms = (mainFilmListContainer, films, onDataChange) => {
  return films.map((film) => {
    const filmController = new MovieController(mainFilmListContainer, onDataChange);

    filmController.render(film);

    return filmController;
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
    this._films = [];
    this._showedFilmControllers = [];
    this._showedExtraFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_QUANTITY_AT_START;
    this._filmsSection = this._container.getElement();
    this._filmsListSection = this._filmsSection.querySelector(`.films-list`);
    this._mainFilmListContainer = this._filmsSection.querySelector(`.films-list__container`);
    this._sortComponent = new SortMenu();
    this._mainContentNoData = new MainContentNoData();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._topRatedListComponent = new ExtraFilmsList(`Top rated`);
    this._mostCommentedListComponent = new ExtraFilmsList(`Most commented`);

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    this._sortComponent.setClickOnSortMenuItemHandler();
  }

  render(siteMainElement, films, user) {
    this._films = films;

    render(siteMainElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(siteMainElement, new SiteMenu(user), RenderPosition.AFTERBEGIN);

    const sortedByRatingFilms = films.slice().sort(sortFilms(`rating`));
    const sortedByCommentsFilms = films.slice().sort(sortFilms(`comments`));

    const renderMainContentNoData = (mainContentElement) => {
      replace(this._mainContentNoData, mainContentElement);
    };

    if (this._films.length <= 0) {
      renderMainContentNoData(this._container);
      return;
    }

    const newFilms = renderFilms(this._mainFilmListContainer, this._films.slice(0, this._showingFilmsCount), this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._renderShowMoreButton();

    this._renderExtraFilms(this._topRatedListComponent, sortedByRatingFilms);
    this._renderExtraFilms(this._mostCommentedListComponent, sortedByCommentsFilms);
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    render(this._filmsListSection, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount += SHOWING_FILMS_QUANTITY_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
      const newFilms = renderFilms(this._mainFilmListContainer, sortedFilms, this._onDataChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderExtraFilms(extraComponent, sortedFilms) {
    const container = extraComponent.getElement().querySelector(`.films-list__container`);

    render(this._filmsSection, extraComponent, RenderPosition.BEFOREEND);

    const extraFilms = renderFilms(container, sortedFilms.slice(0, EXTRA_FILMS_QUANTITY));
    this._showedExtraFilmControllers = this._showedExtraFilmControllers.concat(extraFilms);
  }

  _sortTypeChangeHandler(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_QUANTITY_BY_BUTTON;

    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);

    this._mainFilmListContainer.innerHTML = ``;

    const newFilms = renderFilms(this._mainFilmListContainer, sortedFilms, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderShowMoreButton();
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    filmController.render(this._films[index]);
  }
}
