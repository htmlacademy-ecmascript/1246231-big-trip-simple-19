import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoWaypointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now'
};

const createListEmptyTemplate = (filterType) => {
  const noWaypointsMessage = NoWaypointsTextType[filterType];
  return (
    `<p class="trip-events__msg">
      ${noWaypointsMessage}
    </p>`
  );
};

export default class NoWaypointsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}
