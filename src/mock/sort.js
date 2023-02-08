import { generateSortOptions } from '../utils/sort.js';

const generateSort = (points) =>
  Object.entries(generateSortOptions).map(([optionName, filterPoints]) => ({
    name: optionName,
    sortedPoints: filterPoints(points),
  }));

export { generateSort };
