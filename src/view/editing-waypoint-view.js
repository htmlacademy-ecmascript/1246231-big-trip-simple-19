import dayjs from 'dayjs';
import { createElement } from '../render.js';
import { destinations, offersByTypes } from '../mock/waypoint.js';

const DATE_FORMAT = 'DD/MM/YY HH:mm';

const createEditingWaypointTemplate = (waypoint) => {
  const { type, offers, destination, basePrice, dateFrom, dateTo } = waypoint;
  const pointTypeOffer = offersByTypes.find((offer) => offer.type === type);
  const pointDestination = destinations.find((item) => destination === item.id);

  const parceDateStart = dayjs(dateFrom);
  const parceDateEnd = dayjs(dateTo);

  const pointTypeItemTemplate = offersByTypes.map((element) =>
    `<div class="event__type-item">
      <input
        id="event-type-${element.type}-1"
        class="event__type-input  visually-hidden"
        type="radio" name="event-type"
        value="${element.type}"
      />
      <label class="event__type-label  event__type-label--${element.type}" for="event-type-${element.type}-1">
        ${element.type}
      </label>
    </div>`).join('');


  const offersTemplate = pointTypeOffer.offers.map((offer) =>
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${offer.type}-1"
        type="checkbox"
        name=${offer.title}
        ${offers.includes(offer.id) ? 'checked' : ''}
      />
      <label class="event__offer-label" for="event-offer-${offer.type}-1">
        <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');

  const destinationToChoose = destinations.map((element) => `<option value="${element.name}"></option>`).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
              ${pointTypeItemTemplate}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationToChoose}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${parceDateStart.format(DATE_FORMAT)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${parceDateEnd.format(DATE_FORMAT)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${pointDestination.description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EditingWaypointView {
  constructor(waypoint) {
    this.waypoint = waypoint;
  }

  getTemplate() {
    return createEditingWaypointTemplate(this.waypoint);
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
