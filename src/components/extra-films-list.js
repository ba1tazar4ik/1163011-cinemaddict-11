export const createExtraFilmsListTemplate = (filmsListTittle, filmListContent) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${filmsListTittle}</h2>

      <div class="films-list__container">
      ${filmListContent}
      </div>
    </section>`
  );
};
