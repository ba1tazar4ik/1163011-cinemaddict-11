import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DATE_UP: `date-up`,
  RATING_UP: `rating-up`,
  DEFAULT: `default`,
};

const createSortMenuTemplate = () => {
  return (
    `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE_UP}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING_UP}" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

export default class SortMenu extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortMenuTemplate();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType !== sortType) {

        this._currenSortType = sortType;

        handler(this._currenSortType);
      }
    });
  }
}
