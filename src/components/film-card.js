import {formatDuration} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createFilmCardTemplate = (film) => {
  const commentsCount = film.comments.length;

  return `<article class="film-card">
          <h3 class="film-card__title">${film.title}</h3>
          <p class="film-card__rating">${film.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${film.date.getFullYear()}</span>
            <span class="film-card__duration">${formatDuration(film.duration)}</span>
            <span class="film-card__genre">${film.genre[0]}</span>
          </p>
          <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${film.description}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.isWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${film.isHistory ? `film-card__controls-item--active` : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${film.isFavorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
          </form>
        </article>`;
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClickHandler(handler) {
    const elementsListForClick = this._element.querySelectorAll(`.film-card__title, .film-card__comments, .film-card__poster`);

    elementsListForClick.forEach((current) => {
      current.addEventListener(`click`, handler);
    });
  }
}
