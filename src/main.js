import TripPresenter from './presenter/trip-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import WaypointsApiService from './waypoints-api-service.js';
import { randomString } from './util.js';

const AUTHORIZATION = `Basic ${randomString(12)}`;
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const headerContainer = document.querySelector('.trip-main');
const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel({
  waypointsApiService: new WaypointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: headerFiltersElement,
  filterModel,
  waypointsModel
});

const tripPresenter = new TripPresenter({
  waypointsContainer: mainEventsElement,
  waypointsModel,
  filterModel,
  headerFiltersElement,
  newWaypointButtonContainer: headerContainer,
});

filterPresenter.init();
tripPresenter.init();
waypointsModel.init();
