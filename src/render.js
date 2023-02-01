/**
 * Перечесление параметров для метода insertAdjacentElement().
 */
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * Создаёт DOM-элемент из переданного HTML-шаблона в виде строки.
 * При передаче HTML-шаблон должен иметь общий группирующий тег.
 * 1. Создаёт пустую div-обертку.
 * 2. Помещает внутрь div-обертки HTML-шаблон преобразуя его в DOM-element.
 * 3. Достает этот DOM-element из обёртки и возращает её в return.
 * @param {string} template - HTML-шаблон в виде строки.
 * @returns {Object} DOM-element.
 */
const createElement = function (template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

/**
 * Отрисовывает DOM-element на странице.
 * @param {Object} component - компонент в виде объекта для отрисовки в DOM-дереве.
 * @param {Object} container - DOM-element по отношение к которому отрисовывается компонент.
 * @param {string} place - определяет позицию добавляемого элемента относительно элемента.
 */
const render = function (component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
};

export { RenderPosition, createElement, render };
