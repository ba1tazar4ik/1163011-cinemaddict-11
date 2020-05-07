import {createElement} from "../utils";

const createMainContentNoDataTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class MainContentNoData {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainContentNoDataTemplate();
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
