import { SortType } from '../const.js';
import dayjs from 'dayjs';

const options = {
  [SortType.DAY]: () => false,
  [SortType.EVENT]: () => true,
  [SortType.TIME]: () => true,
  [SortType.PRICE]: () => false,
  [SortType.OFFERS]: () => true,
};

const getSortedWaypoints = (waypoints, sortType) => {
  switch (sortType) {
    case SortType.DAY:
      return waypoints.sort((waypointA, waypointB) => dayjs(waypointA.dateFrom).diff(dayjs(waypointB.dateFrom)));
    case SortType.PRICE:
      return waypoints.sort((waypointA, waypointB) => waypointB.basePrice - waypointA.basePrice);
    default:
      return waypoints;
  }
};

const isPriceEqual = (priceA, priceB) => (priceA === null && priceB === null) || (priceA === priceB);

const getSort = () =>
  Object.entries(options).map(([optionName, isDisabledOption]) => ({
    name: optionName,
    disabled: isDisabledOption(optionName),
  }));

export {
  options,
  getSortedWaypoints,
  isPriceEqual,
  getSort
};
