import { getSortedWaypoints } from '../utils/sort.js';
import { SortType } from '../const.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class WaypointsModel extends Observable {
  #waypointsApiService = null;
  #waypoints = [];
  #offers = [];
  #destinations = [];

  constructor({ waypointsApiService }) {
    super();
    this.#waypointsApiService = waypointsApiService;
  }

  get waypoints() {
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
      const waypoints = await this.#waypointsApiService.waypoints;
      const offers = await this.#waypointsApiService.offers;
      const destinations = await this.#waypointsApiService.destinations;

      this.#waypoints = waypoints.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;
    } catch (err) {
      this.#waypoints = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  };

  async updateWaypoint(updateType, update) {
    const index = this.#waypoints.findIndex((waypoints) => waypoints.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point: ${update}`);
    }

    try {
      const response = await this.#waypointsApiService.updateWaypoint(update);
      const updatedWaypoint = this.#adaptToClient(response);

      this.#waypoints = [
        ...this.#waypoints.slice(0, index),
        updatedWaypoint,
        ...this.#waypoints.slice(index + 1),
      ];
      this._notify(updateType, updatedWaypoint);
    } catch (err) {
      throw new Error(`Can't update point: ${update}. Error: ${err}`);
    }
  }

  async addWaypoint(updateType, update) {
    try {
      const response = await this.#waypointsApiService.addWaypoint(update);
      const newWaypoint = this.#adaptToClient(response);
      this.#waypoints = [newWaypoint, ...this.#waypoints];
      this._notify(updateType, newWaypoint);
    } catch (err) {
      throw new Error(`Can't add point ${update}. Error: ${err}`);
    }
  }

  async deleteWayoint(updateType, update) {
    const index = this.#waypoints.findIndex((waypoints) => waypoints.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#waypointsApiService.deleteWayoint(update);
      this.#waypoints = [
        ...this.#waypoints.slice(0, index),
        ...this.#waypoints.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(waypoints) {
    const adaptedWaypoints = {
      ...waypoints,
      basePrice: waypoints['base_price'],
      dateFrom: new Date(waypoints['date_from']),
      dateTo: new Date(waypoints['date_to'])
    };

    delete adaptedWaypoints['base_price'];
    delete adaptedWaypoints['date_from'];
    delete adaptedWaypoints['date_to'];

    return adaptedWaypoints;
  }
}
