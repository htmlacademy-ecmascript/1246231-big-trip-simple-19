import WaypointsFilterView from './view/waypoints-filter-view.js';
import { render } from './render.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');

render(new WaypointsFilterView(), siteFiltersElement);
