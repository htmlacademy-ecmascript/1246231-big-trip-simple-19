import AbstractView from '../framework/view/abstract-view.js';
import { getDayAndMonth, getTime } from '../utils/dates.js';
import he from 'he';

const createPointTemplate = (point, destinations, offersByType) => {
  const {type, offers, destination, basePrice, dateFrom, dateTo} = point;
  const pointTypeOffer = offersByType.find((offer) => offer.type === type);
  const pointDestination = destinations.find((item) => destination === item.id);

  let offersTemplate =
    `<li class="event__offer">
      <span class="event__offer-title">No additional offers</span>
    </li>`;

  if (pointTypeOffer.offers.length !== 0) {
    offersTemplate = pointTypeOffer.offers
      .filter((offer) => offers.includes(offer.id))
      .map((offer) =>
        `<li class="event__offer">
          <span class="event__offer-title">${he.encode(offer.title)}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${he.encode(offer.price.toString())}</span>
        </li>`).join('');
  }

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${he.encode(getDayAndMonth(dateFrom))}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${he.encode(pointDestination.name)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${he.encode(getTime(dateFrom))}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${he.encode(getTime(dateTo))}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${he.encode(basePrice.toString())}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};

export default class PointView extends AbstractView {
  #point = null;
  #allDestinations = null;
  #allOffers = null;
  #handleRollupBtnClick = null;

  constructor({point, allDestinations, allOffers, onRollupBtnClick}) {
    super();
    this.#point = point;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleRollupBtnClick = onRollupBtnClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupBtnClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#allDestinations, this.#allOffers);
  }

  #rollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupBtnClick();
  };
}
