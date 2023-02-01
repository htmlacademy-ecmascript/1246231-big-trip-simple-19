import FiltersView from './view/filters-view.js';
import { render } from './render.js';
import TripPresenter from './presenter/trip-presenter.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteTripBody = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteTripBody);

render(new FiltersView(), siteFiltersElement);

tripPresenter.init();
