export const createUserRatingTemplate = (userData) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${userData.rating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

