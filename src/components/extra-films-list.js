export const createExtraFilmsListTemplate = (filmsListTittle, filmsListContent) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${filmsListTittle}</h2>

      <div class="films-list__container">
      ${filmsListContent}
      </div>
    </section>`
  );
};
