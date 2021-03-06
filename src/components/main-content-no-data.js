import AbstractComponent from "./abstract-component.js";

const createMainContentNoDataTemplate = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>

      <div class="films-list__container">
      </div>

    </section>
  </section>`
  );
};

export default class MainContentNoData extends AbstractComponent {

  getTemplate() {
    return createMainContentNoDataTemplate();
  }
}
