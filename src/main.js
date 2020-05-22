import UserRating from "./components/user-rating.js";
import MainContent from "./components/main-content.js";
import {generateFilms} from "./mock/film.js";
import {generateUser} from "./mock/user.js";
import {getRandomIntegerNumber} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";
import Statistics from "./components/statistics.js";
import PageController from "./controllers/page.js";

const MAIN_FILMS_QUANTITY = 20;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer__statistics`);

const user = generateUser(getRandomIntegerNumber(0, MAIN_FILMS_QUANTITY));
const films = generateFilms(MAIN_FILMS_QUANTITY, user);

render(siteHeaderElement, new UserRating(user), RenderPosition.BEFOREEND);

const mainContent = new MainContent();
const pageController = new PageController(mainContent);

render(siteMainElement, mainContent, RenderPosition.BEFOREEND);
pageController.render(siteMainElement, films, user);

const filmsStatistics = new Statistics(films);
render(siteFooterElement, filmsStatistics, RenderPosition.BEFOREEND);
