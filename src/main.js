import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import WaypointsModel from './model/waypoint-model.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteTripBody = document.querySelector('.trip-events');
const waypointsModel = new WaypointsModel();

const tripPresenter = new TripPresenter({
  tripContainer: siteTripBody,
  waypointsModel
});

render(new FiltersView(), siteFiltersElement);

tripPresenter.init();
