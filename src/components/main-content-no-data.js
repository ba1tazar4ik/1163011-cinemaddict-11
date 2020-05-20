import AbstractComponent from "./abstract-component.js";

const createMainContentNoDataTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class MainContentNoData extends AbstractComponent {

  getTemplate() {
    return createMainContentNoDataTemplate();
  }
}
