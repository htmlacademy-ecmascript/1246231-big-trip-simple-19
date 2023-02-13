import AbstractView from '../framework/view/abstract-view.js';

const renderFilterOptionsTemplate = (filters, currentFilterType) =>
  filters
    .map(
      (filter) =>
        `<div class="trip-filters__filter">
          <input
            id="filter-${filter.name}"
            class="trip-filters__filter-input
            visually-hidden" type="radio"
            name="trip-filter"
            value="${filter.name}"
            ${filter.count === 0 ? 'disabled' : ''}
            ${filter.name === currentFilterType ? 'checked' : ''}
            data-sort-type="${filter.name}"
          >

          <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
        </div>`
    ).join('');

const createListFilterTemplate = (filters, currentFilterType) =>
  `<form class="trip-filters" action="#" method="get">
    ${renderFilterOptionsTemplate(filters, currentFilterType)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class ListFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createListFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#handleFilterChange(evt.target.value);
  };
}
