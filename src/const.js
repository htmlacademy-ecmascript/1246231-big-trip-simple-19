import dayjs from 'dayjs';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_WAYPOINT: 'UPDATE_WAYPOINT',
  ADD_WAYPOINT: 'ADD_WAYPOINT',
  DELETE_WAYPOINT: 'DELETE_WAYPOINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const DEFAULT_START_DATE = dayjs().toDate();
const DEFAULT_END_DATE = dayjs().add((1), 'day').toDate();

const defaultNewWaypoint = {
  basePrice: '',
  dateFrom: DEFAULT_START_DATE,
  dateTo: DEFAULT_END_DATE,
  destination: null,
  id: 0,
  offers: [],
  type: 'taxi'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const FormType = {
  EDITING: 'EDITING',
  CREATING: 'CREATING'
};

const MIN_FLATPICKER_DATE = dayjs('2020-01-01 00:00').toISOString();

export {
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  defaultNewWaypoint,
  TimeLimit,
  FormType,
  MIN_FLATPICKER_DATE
};
