const isEscapeKey = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

const randomString = (i) => {
  let rnd = '';
  while (rnd.length < i) { rnd += Math.random().toString(36).substring(2); }
  return rnd.substring(0, i);
};

export { isEscapeKey, randomString };
