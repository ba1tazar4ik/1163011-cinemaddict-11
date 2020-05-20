import AbstractComponent from "./abstract-component.js";

const createExtraFilmsListTemplate = (filmsListTittle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${filmsListTittle}</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class ExtraFilmsList extends AbstractComponent{
  constructor(filmsListTittle) {
    super();

    this._listTittle = filmsListTittle;
  }

  getTemplate() {
    return createExtraFilmsListTemplate(this._listTittle);
  }
}
