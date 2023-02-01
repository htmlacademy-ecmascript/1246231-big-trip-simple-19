import { createElement } from '../render.js';

const createWaypointsListTemplate = function () {
  return ('<ul class="trip-events__list"></ul>');
};

export default class WaypointsListView {
  getTemplate() {
    return createWaypointsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
