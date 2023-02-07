import { createElement } from '../render.js';

const createEmptyListTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class EmptyListView {
  getTemplate() {
    return createEmptyListTemplate();
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
