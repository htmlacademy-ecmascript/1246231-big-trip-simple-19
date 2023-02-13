import AbstractView from '../framework/view/abstract-view.js';

const createNewPointButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewPointButtonView extends AbstractView {
  #handleNewPointButtonClick = null;
  #newPointButtonContainer = null;

  constructor({newPointButtonContainer, onNewPointButtonClick}) {
    super();
    this.#newPointButtonContainer = newPointButtonContainer;
    this.#handleNewPointButtonClick = onNewPointButtonClick;
    this.element.addEventListener('click', this.#newPointButtonClickHandler);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #newPointButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewPointButtonClick();
  };
}
