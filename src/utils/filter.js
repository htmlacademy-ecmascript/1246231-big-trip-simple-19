import { FilterType } from '../const.js';
import { isFutureEvent } from './dates.js';

const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isFutureEvent(waypoint.dateFrom, waypoint.dateTo)),
};

export { filter };
