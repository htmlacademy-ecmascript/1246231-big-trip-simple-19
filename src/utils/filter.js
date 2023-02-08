import { FilterType } from '../const.js';
import { isFutureEvent } from '../mock/dates.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.dateFrom, point.dateTo))
};

export { filter };
