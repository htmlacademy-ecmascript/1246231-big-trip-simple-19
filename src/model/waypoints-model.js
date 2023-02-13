import { getSortedWaypoints } from '../utils/sort.js';
import { SortType } from '../const.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class WaypointsModel extends Observable {
  #pointsApiService = null;
  #waypoints = [];
  #offers = [];
  #destinations = [];

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;

  }

  get points() {
    return getSortedWaypoints(this.#waypoints, SortType.DAY);
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get cities() {
    const cities = [];
    this.#destinations.forEach((destination) => cities.push(destination.name));
    return cities;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      const offers = await this.#pointsApiService.offers;
      const destinations = await this.#pointsApiService.destinations;

      this.#waypoints = points.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;
    } catch (err) {
      this.#waypoints = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  };

  async updatePoint(updateType, update) {
    const index = this.#waypoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point: ${update}`);
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#waypoints = [
        ...this.#waypoints.slice(0, index),
        updatedPoint,
        ...this.#waypoints.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error(`Can't update point: ${update}. Error: ${err}`);
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#waypoints = [newPoint, ...this.#waypoints];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error(`Can't add point ${update}. Error: ${err}`);
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#waypoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#waypoints = [
        ...this.#waypoints.slice(0, index),
        ...this.#waypoints.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: new Date(point['date_from']),
      dateTo: new Date(point['date_to'])
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  }
}
