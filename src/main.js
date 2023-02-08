import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import ListSortingView from './view/sorting-view.js';
import { generateFilter } from './mock/filter.js';
import { generateSort } from './mock/sort.js';
import { getMockPoints } from './mock/point.js';

const mockPoints = getMockPoints();
const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(mockPoints);
const tripPresenter = new TripPresenter({
  pointsContainer: mainEventsElement,
  pointsModel
});

const points = pointsModel.points;

const filters = generateFilter(points);

render(new FiltersView({filters}), headerFiltersElement);

const sortedPoints = generateSort(points);
render(new ListSortingView(sortedPoints), mainEventsElement);

tripPresenter.init();
