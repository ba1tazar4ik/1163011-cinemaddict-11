import FilmCard from "../components/film-card.js";
import FilmDetails from "../components/film-details.js";
import {render, RenderPosition} from "../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._bodyElement = document.querySelector(`body`);

    this._filmCard = null;
    this._filmDetail = null;

    this._onDataChange = onDataChange;

    this._escapeKeyDownHandler = this._escapeKeyDownHandler.bind(this);
  }

  render(film) {

    this._filmCard = new FilmCard(film);

    render(this._container, this._filmCard, RenderPosition.BEFOREEND);

    this._filmCard.setClickHandler(() => {
      this._filmDetail = new FilmDetails(film);
      this._addFilmDetails();
      this._filmDetail.setClickHandler(filmDetailButtonCloseClickHandler);
      this._filmDetail.setFavoritesButtonClickHandler(favoritesButtonClickHandler);
      this._filmDetail.setWatchedButtonClickHandler(watchedButtonClickHandler);
      this._filmDetail.setWatchlistButtonClickHandler(watchlistButtonClickHandler);

      document.addEventListener(`keydown`, this._escapeKeyDownHandler);
    });

    const filmDetailButtonCloseClickHandler = () => {
      this._removeFilmDetails();
      document.removeEventListener(`keydown`, this._escapeKeyDownHandler);
    };

    const favoritesButtonClickHandler = () => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorites: !film.isFavorites,
      }));
    };

    const watchedButtonClickHandler = () => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isHistory: !film.isHistory,
      }));
    };

    const watchlistButtonClickHandler = () => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    };

    this._filmCard.setFavoritesButtonClickHandler(favoritesButtonClickHandler);
    this._filmCard.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmCard.setWatchlistButtonClickHandler(watchlistButtonClickHandler);
  }

  _addFilmDetails() {
    this._bodyElement.appendChild(this._filmDetail.getElement());
  }

  _removeFilmDetails() {
    this._bodyElement.removeChild(this._filmDetail.getElement());
  }

  _escapeKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._removeFilmDetails();
      document.removeEventListener(`keydown`, this._escapeKeyDownHandler);
    }
  }
}
