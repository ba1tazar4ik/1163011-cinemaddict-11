import AbstractComponent from "./abstract-component.js";

const createUserRatingTemplate = (userData) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${userData.rating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserRating extends AbstractComponent {
  constructor(userData) {
    super();

    this._user = userData;
  }

  getTemplate() {
    return createUserRatingTemplate(this._user);
  }
}
