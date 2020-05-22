import AbstractComponent from "./abstract-component.js";

const createStatisticsTemplate = (films) => {
  return `<p>${films.length} movies inside</p>`;
};

export default class Statistics extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createStatisticsTemplate(this._films);
  }
}
