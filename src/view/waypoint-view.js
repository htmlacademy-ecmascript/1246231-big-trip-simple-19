import { destinations, offersByType } from '../mock/point.js';
import AbstractView from '../framework/view/abstract-view.js';
import { getDayAndMonth, getTime } from '../utils/dates.js';


const createPointTemplate = (point) =>{
  const {type, offers, destination, basePrice, dateFrom, dateTo} = point;
  const pointTypeOffer = offersByType.find((offer) => offer.type === type);
  const pointDestination = destinations.find((item) => destination === item.id);

  let offersTemplate =
  `<li class="event__offer">
    <span class="event__offer-title">No additional offers</span>
  </li>`;
  if (pointTypeOffer) {
    offersTemplate = pointTypeOffer.offers
      .filter((offer) => offers.includes(offer.id))
      .map((offer) =>
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>
        `).join('');
  }


  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${getDayAndMonth(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${getTime(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${getTime(dateTo)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `);
};

export default class PointView extends AbstractView {
  #point = null;
  #handleRollupBtnClick = null;

  constructor({point, onRollupBtnClick}) {
    super();
    this.#point = point;
    this.#handleRollupBtnClick = onRollupBtnClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupBtnClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #rollupBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupBtnClick();
  };
}
