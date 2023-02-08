import { SortType } from '../const.js';
import dayjs from 'dayjs';

const generateSortOptions = {
  [SortType.DAY]: (points) => points.sort((pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom))),
  [SortType.EVENT]: (points) => points,
  [SortType.TIME]: (points) => points,
  [SortType.PRICE]: (points) => points.sort((pointA, pointB) => pointB.basePrice - pointA.basePrice),
  [SortType.OFFERS]: (points) => points,
};

export { generateSortOptions };
