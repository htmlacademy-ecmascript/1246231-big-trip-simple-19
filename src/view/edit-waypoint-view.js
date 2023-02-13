import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getDate } from '../utils/dates.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { MIN_FLATPICKER_DATE } from '../const.js';
import he from 'he';

const createEditPointTemplate = (point, destinations, offersByType, isNewPoint) => {
  const { type, offers, destination, basePrice, dateFrom, dateTo, id, isDisabled, isSaving, isDeleting } = point;
  const isValidForm = destination && basePrice;
  const saveBtnText = isSaving ? 'Saving...' : 'Save';
  const deleteBtnText = isDeleting ? 'Deleting...' : 'Delete';

  const pointTypeOffers = offersByType.find((offer) => offer.type === type);
  const pointDestination = destinations.find((item) => destination === item.id);
  const destinationName = destination !== null ? pointDestination.name : '';

  const tripOptionsList = offersByType.map((option) =>
    `<div class="event__type-item">
      <input
        id="event-type-${option.type}-${option.id}"
        class="event__type-input
        visually-hidden"
        type="radio"
        name="event-type"
        value="${option.type}"
        ${option.type === type ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="event__type-label  event__type-label--${option.type}"
        for="event-type-${option.type}-${option.id}">${option.type}
      </label>
    </div>`).join('');

  const offersTemplate = () => {
    let template = '';
    if (pointTypeOffers) {
      template = pointTypeOffers.offers
        .map((offer) =>
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden"
              id="event-offer-${he.encode(type)}-${offer.id}"
              type="checkbox"
              name="${he.encode(offer.title)}"
              ${offers.includes(offer.id) ? 'checked' : ''}
              data-offer-id="${offer.id}"
            >
            <label class="event__offer-label" for="event-offer-${he.encode(type)}-${offer.id}">
              <span class="event__offer-title">${he.encode(offer.title)}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${he.encode(offer.price.toString())}</span>
            </label>
          </div>`).join('');
    }
    return template;
  };

  const destinationToChoose = destinations.map((city) => `<option value="${he.encode(city.name)}"></option>`).join('');

  const offersSectionTemplate = () => {
    let template =
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersTemplate()}
        </div>
      </section>`;

    if (pointTypeOffers.offers.length === 0) {
      template = '';
    }
    return template;
  };

  const picturesTemplate = () => {
    let template = '';
    if (pointDestination) {
      template = pointDestination.pictures
        .map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
    }
    return template;
  };

  const destinationSectionTemplate = () => {
    let template = '';
    if (pointDestination) {
      template =
        `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${he.encode(pointDestination.description)}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${picturesTemplate()}
            </div>
          </div>
        </section>`;
    }
    return template;
  };

  const isNewPointTemplate = () => {
    let template = (
      `<button class="event__reset-btn" type="reset">${deleteBtnText}</button>
      <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
        <span class="visually-hidden">Open event</span>
      </button>`
    );
    if (isNewPoint) {
      template = '<button class="event__reset-btn" type="reset">Cancel</button>';
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

            <input
              class="event__type-toggle  visually-hidden"
              id="event-type-toggle-${id}"
              type="checkbox"
              ${isDisabled ? 'disabled' : ''}
            >

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${tripOptionsList}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${he.encode(type)}
            </label>

            <input
              class="event__input
              event__input--destination"
              id="event-destination-${id}"
              type="text"
              name="event-destination"
              value="${he.encode(destinationName)}"
              list="destination-list-${id}"
              ${isDisabled ? 'disabled' : ''}
            >

            <datalist id="destination-list-${id}">
              ${destinationToChoose}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input
              class="event__input
              event__input--time"
              id="event-start-time-${id}"
              type="text"
              name="event-start-time"
              value="${getDate(dateFrom)}"
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input
              class="event__input
              event__input--time"
              id="event-end-time-${id}"
              type="text"
              name="event-end-time"
              value="${getDate(dateTo)}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>

            <input
              class="event__input  event__input--price"
              id="event-price-${id}"
              type="text"
              name="event-price"
              value="${he.encode(basePrice.toString())}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isValidForm ? '' : 'disabled'} ${isDisabled ? 'disabled' : ''}>${saveBtnText}</button>
          ${isNewPointTemplate()}
        </header>

        <section class="event__details">
          ${offersSectionTemplate()}

          ${destinationSectionTemplate()}
        </section>
      </form>
    </li>`
  );
};

export default class EditWaypointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleRollupBtnClick = null;
  #allDestinations = null;
  #allOffers = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;
  #isNewPoint = null;
  #allCities = null;

  constructor({ point, allDestinations, allOffers, allCities, onFormSubmit, onRollupBtnClick, onDeleteClick, isNewPoint = false }) {
    super();
    this._setState(EditWaypointView.parsePointToState(point));
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#allCities = allCities;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupBtnClick = onRollupBtnClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#isNewPoint = isNewPoint;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#allDestinations, this.#allOffers, this.#isNewPoint);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    if (this._state.id) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#rollupButtonClickHandler);
    }

    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.element.querySelectorAll('.event__offer-selector input')
      .forEach((offer) => offer.addEventListener('change', this.#offerChangeHandler));

    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditWaypointView.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupBtnClick();
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'INPUT') {
      this.updateElement({
        type: evt.target.value,
        offers: []
      });
    }
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.value && this.#allCities.includes(evt.target.value)) {
      this.updateElement({
        destination: this.#allCities.indexOf(evt.target.value) + 1,
      });
    } else {
      evt.target.value = '';
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    let price = Number(evt.target.value);

    if (price < 0) {
      price = Math.abs(price);
    }

    evt.target.value = isNaN(price) ? this._state.basePrice : price;

    this.updateElement({
      basePrice: +evt.target.value
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    evt.target.toggleAttribute('checked');

    let selectedOffers = this._state.offers;

    if (evt.target.hasAttribute('checked')) {
      selectedOffers.push(+(evt.target.dataset.offerId));
    } else {
      selectedOffers = selectedOffers.filter((id) => id !== +(evt.target.dataset.offerId));
    }

    this._setState({
      offers: selectedOffers
    });
  };

  reset = (point) => {
    this.updateElement(
      EditWaypointView.parsePointToState(point)
    );
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
    this.#setDateToPicker();
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
    this.#setDateFromPicker();
  };

  #setDateFromPicker = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: MIN_FLATPICKER_DATE,
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        'time_24hr': true
      }
    );
  };

  #setDateToPicker = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this.#datepickerFrom.latestSelectedDateObj,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        'time_24hr': true
      }
    );
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditWaypointView.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };
    delete point.isDisabled;
    delete point.isDeleting;
    delete point.isSaving;

    return point;
  };
}
