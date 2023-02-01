import { createElement } from '../render.js';

const createTravelListTemplate = function () {
  return ('<ul class="trip-events__list"></ul>');
};

export default class TravelListView {
  getTemplate() {
    return createTravelListTemplate();
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
