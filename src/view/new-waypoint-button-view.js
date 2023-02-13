import AbstractView from '../framework/view/abstract-view.js';

const createNewWaypointButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewWaypointButtonView extends AbstractView {
  #handleNewWaypointButtonClick = null;
  #newWaypointButtonContainer = null;

  constructor({newWaypointButtonContainer, onNewWaypointButtonClick}) {
    super();
    this.#newWaypointButtonContainer = newWaypointButtonContainer;
    this.#handleNewWaypointButtonClick = onNewWaypointButtonClick;
    this.element.addEventListener('click', this.#newPointButtonClickHandler);
  }

  get template() {
    return createNewWaypointButtonTemplate();
  }

  #newPointButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewWaypointButtonClick();
  };
}
