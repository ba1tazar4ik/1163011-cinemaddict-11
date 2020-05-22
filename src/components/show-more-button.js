import AbstractComponent from "./abstract-component.js";

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractComponent {

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this._element.addEventListener(`click`, handler);
  }
}
