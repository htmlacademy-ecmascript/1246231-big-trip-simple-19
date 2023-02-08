import AbstractView from '../framework/view/abstract-view.js';

const createSortingTemplate = (option, isChecked) => {
  const { name, count } = option;

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input
      id="sort-${name}"
      class="trip-sort__input
      visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${name}"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>`
  );
};
const createListSortTemplate = (sortOptions) => {
  const sortOptionsTemplate = sortOptions
    .map((option, index) => createSortingTemplate(option, index === 0))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortOptionsTemplate}
  </form>`
  );
};

export default class ListSortingView extends AbstractView {
  #options = null;

  constructor(options) {
    super();
    this.#options = options;
  }

  get template() {
    return createListSortTemplate(this.#options);
  }
}
