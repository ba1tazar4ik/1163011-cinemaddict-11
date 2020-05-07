import {createElement} from "../utils";

const createUserRatingTemplate = (userData) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${userData.rating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserRating {
  constructor(userData) {
    this._user = userData;
    this._element = null;
  }

  getTemplate() {
    return createUserRatingTemplate(this._user);
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
