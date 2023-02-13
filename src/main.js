import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';
import { randomString } from './util.js';

const AUTHORIZATION = `Basic ${randomString(12)}`;
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const headerContainer = document.querySelector('.trip-main');
const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainEventsElement = document.querySelector('.trip-events');


const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: headerFiltersElement,
  filterModel,
  pointsModel
});

const tripPresenter = new TripPresenter({
  pointsContainer: mainEventsElement,
  pointsModel,
  filterModel,
  headerFiltersElement,
  newPointButtonContainer: headerContainer,
});

filterPresenter.init();
tripPresenter.init();
pointsModel.init();
