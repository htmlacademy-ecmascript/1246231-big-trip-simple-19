import FiltersEventsView from './view/filters-events-view.js';
import { render } from './render.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');

render(new FiltersEventsView(), siteFiltersElement);
