const getRandomArrayElement = (items) => (
  items[Math.floor(Math.random() * items.length)]
);

const getRandomInt = () => Math.floor(Math.random() * 100);

export { getRandomArrayElement, getRandomInt };
