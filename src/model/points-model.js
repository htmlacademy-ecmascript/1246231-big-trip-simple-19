import { getRandomPoint } from '../mock/point.js';

const POINTS_COUNT = 5;

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  get points(){
    return this.#points;
  }
}
