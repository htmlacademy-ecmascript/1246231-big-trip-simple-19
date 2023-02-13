import AbstractView from '../framework/view/abstract-view.js';

const renderSortOptionsTemplate = (sortOptions, currentSortType) =>
  sortOptions
    .map(
      (sortOption) =>
        `<div class="trip-sort__item  trip-sort__item--${sortOption.name}">
          <input
          id="sort-${sortOption.name}"
          class="trip-sort__input
          visually-hidden" type="radio"
          name="trip-sort"
          value="${sortOption.name}"
          ${sortOption.name === currentSortType ? 'checked' : ''}
          ${sortOption.disabled ? 'disabled' : ''}>
          <label
          class="trip-sort__btn"
          data-sort-type=${sortOption.name}
          for="sort-${sortOption.name}">
          ${sortOption.name}
          </label>
        </div>`
    ).join('');

const createListSortTemplate = (sortOptions, currentSortType) =>
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
    ${renderSortOptionsTemplate(sortOptions, currentSortType)}
  </form>`;

export default class ListSortView extends AbstractView {
  #sortOptions = null;
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({sortOptions, currentSortType, onSortTypeChange}) {
    super();
    this.#sortOptions = sortOptions;
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(this.#sortOptions, this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
