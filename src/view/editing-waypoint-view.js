import { destinations, offersByType } from '../mock/point.js';
import AbstractView from '../framework/view/abstract-view.js';
import { getDate } from '../utils/dates.js';

const createEditPointTemplate = (point) => {
  const {type, offers, destination, basePrice, dateFrom, dateTo, id} = point;
  const pointTypeOffer = offersByType.find((offer) => offer.type === type);
  const pointDestination = destinations.find((item) => destination === item.id);

  const tripOptionsList = offersByType.map((element) =>
    `<div class="event__type-item">
      <input id="event-type-${element.type}-${element.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.type}">
      <label class="event__type-label  event__type-label--${element.type}" for="event-type-${element.type}-${element.id}">${element.type}</label>
    </div>
    `).join('');

  const offersTemplate = () => {
    let template = '';
    if (pointTypeOffer) {
      template = pointTypeOffer.offers
        .map((offer) =>
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-${offer.id}" type="checkbox" name=${offer.title} ${offers.includes(offer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${offer.type}-${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `).join('');
    }
    return template;
  };

  const destinationToChoose = destinations.map((element) => `<option value="${element.name}"></option>`).join('');

  const offersSectionTemplate = () => {
    let template =
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate()}
      </div>
    </section>`;

    if (!pointTypeOffer) {
      template = '';
    }
    return template;
  };
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${tripOptionsList}
            </fieldset>
          </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
            ${destinationToChoose}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${getDate(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${getDate(dateTo)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersSectionTemplate()}
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${pointDestination.description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EditPointView extends AbstractView {
  #point = null;
  #handleFormSubmit = null;
  #handleRollupBtnClick = null;

  constructor({point, onFormSubmit, onRollupBtnClick}) {
    super();
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupBtnClick = onRollupBtnClick;

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupBtnClick();
  };
}
