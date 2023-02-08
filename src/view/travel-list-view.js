import AbstractView from '../framework/view/abstract-view.js';

const createTravelListTemplate = () => ('<ul class="trip-events__list"></ul>');

export default class TravelListView extends AbstractView {
  get template() {
    return createTravelListTemplate();
  }
}
