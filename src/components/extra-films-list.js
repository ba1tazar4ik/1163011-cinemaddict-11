import {createElement} from "../utils";

const createExtraFilmsListTemplate = (filmsListTittle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${filmsListTittle}</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class ExtraFilmsList {
  constructor(filmsListTittle) {
    this._listTittle = filmsListTittle;
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmsListTemplate(this._listTittle);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
