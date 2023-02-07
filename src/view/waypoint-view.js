import dayjs from 'dayjs';
import { createElement } from '../render.js';
import { destinations, offersByTypes } from '../mock/waypoint.js';

const DATE_FORMAT_DATE = 'DD MMM';
const DATE_FORMAT_TIME = 'HH:mm';

const createWaypointTemplate = (waypoint) => {
  const { type, offers, destination, basePrice, dateFrom, dateTo } = waypoint;
  const pointTypeOffer = offersByTypes.find((offer) => offer.type === type);
  const pointDestination = destinations.find((item) => destination === item.id);
  const checkedOffers = pointTypeOffer.offers.filter((offer) => offers.includes(offer.id));

  const offersTemplate = () => {
    if (!checkedOffers.length) {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">No additional offers</span>
        </li>`
      );
    } else {
      const template = checkedOffers.map((offer) =>
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`).join('');

      return template;
    }
  };

  const parceDateStart = dayjs(dateFrom);
  const parceDateEnd = dayjs(dateTo);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${parceDateStart.format(DATE_FORMAT_DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${parceDateStart.format(DATE_FORMAT_TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${parceDateEnd.format(DATE_FORMAT_TIME)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate()}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class WaypointView {
  constructor({ waypoint }) {
    this.waypoint = waypoint;
  }

  getTemplate() {
    return createWaypointTemplate(this.waypoint);
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
