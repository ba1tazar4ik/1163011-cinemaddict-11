import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details.js";
import {render, RenderPosition} from "../utils/render.js";

export default class MovieController {
  constructor(container) {
    this._container = container;
    this._bodyElement = document.querySelector(`body`);

    this._filmCard = null;
    this._filmDetail = null;

    this._escapeKeyDownHandler = this._escapeKeyDownHandler.bind(this);
  }

  render(film) {

    this._filmCard = new FilmCard(film);

    render(this._container, this._filmCard, RenderPosition.BEFOREEND);

    this._filmCard.setClickHandler(() => {
      this._filmDetail = new FilmDetails(film);
      this._addFilmDetails();
      this._filmDetail.setClickHandler(() => {
        this._removeFilmDetails();
        document.removeEventListener(`keydown`, this._escapeKeyDownHandler);
      });

      document.addEventListener(`keydown`, this._escapeKeyDownHandler);
    });
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
