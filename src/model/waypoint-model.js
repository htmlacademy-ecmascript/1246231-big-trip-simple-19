import { getRandomPoint } from '../mock/waypoint.js';

const WAYPOINTS_COUNT = 5;

export default class PointsModel {
  points = Array.from({ length: WAYPOINTS_COUNT }, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
