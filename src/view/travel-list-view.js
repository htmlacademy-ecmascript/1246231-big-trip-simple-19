import { createElement } from '../render.js';

const createTravelListTemplate = () => ('<ul class="trip-events__list"></ul>');

export default class TravelListView {
  #element = null;

  get template() {
    return createTravelListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
