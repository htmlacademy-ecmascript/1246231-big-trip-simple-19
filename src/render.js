const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * 1. Создаёт пустой div-блок.
 * 2. Берёт HTML-тег в виде строки и помещает его в div-блок, преобразуя в DOM-element.
 * 3. Возвращает этот DOM-element.
 * HTML-тег должен иметь общую обертку
 * @param {string} template - HTML-тег в виде строки
 * @returns {Object}
 */
function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

export { RenderPosition, createElement, render };
