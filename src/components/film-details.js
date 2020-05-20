import {formatCommentDate, formatDuration, formatFilmDate} from "../utils/common.js";
import {emojis} from "../const.js";
import AbstractComponent from "./abstract-component.js";

const generateFilmDetailsGenreMarkup = (array) => {
  return array.reduce((accumulator, currentValue) => {
    return accumulator + `<span class="film-details__genre">${currentValue}</span>`;
  }, ``);
};

const generateFilmCommentsMarkup = (array) => {
  return array.reduce((accumulator, currentValue) => {
    return accumulator + `<li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/${currentValue.emotion}.png" width="55" height="55" alt="emoji-smile">
                </span>
                <div>
                  <p class="film-details__comment-text">${currentValue.text}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${currentValue.author}</span>
                    <span class="film-details__comment-day">${formatCommentDate(currentValue.date)}</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>`;
  }, ``);
};

const generateNewFilmCommentEmojiListMarkup = (array) => {
  return array.reduce((accumulator, currentValue) => {
    return accumulator + `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${currentValue}" value="${currentValue}">
                <label class="film-details__emoji-label" for="emoji-${currentValue}">
                  <img src="./images/emoji/${currentValue}.png" width="30" height="30" alt="emoji">
                </label>`;
  }, ``);
};

const createFilmDetailsTemplate = (film) => {

  const commentsCount = film.comments.length;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${film.poster}" alt="">

              <p class="film-details__age">${film.age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.title}</h3>
                  <p class="film-details__title-original">Original: ${film.originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${film.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${film.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${film.writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${film.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatFilmDate(film.date)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatDuration(film.duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${generateFilmDetailsGenreMarkup(film.genre)}</td>
                </tr>
              </table>

              <p class="film-details__film-description">${film.description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            ${commentsCount > 0 ? `<ul class="film-details__comments-list">${generateFilmCommentsMarkup(film.comments)}</ul>` : ``}

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${generateNewFilmCommentEmojiListMarkup(emojis)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }
}
