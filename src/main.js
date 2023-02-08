import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteTripBody = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const tripPresenter = new TripPresenter({
  pointsContainer: siteTripBody,
  pointsModel
});

render(new FiltersView(), siteFiltersElement);

tripPresenter.init();
