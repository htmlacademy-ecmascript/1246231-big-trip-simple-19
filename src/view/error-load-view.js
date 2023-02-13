import AbstractView from '../framework/view/abstract-view.js';

const createErrorLoadTemplate = () => ('<p class="trip-events__msg">Something went wrong. Try restart the page</p>');

export default class ErrorLoadView extends AbstractView {
  get template() {
    return createErrorLoadTemplate();
  }
}
