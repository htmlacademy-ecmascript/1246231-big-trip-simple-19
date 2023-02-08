import { getRandomArrayElement, getRandomInteger } from './util.js';

import { OFFERS_TITLES, POINTS_TYPES } from './const.js';

const MIN_OFFER_PRICE = 20;
const MAX_OFFER_PRICE = 250;
const MIN_OFFERS = 3;
const MAX_OFFERS = 8;

const getOffer = (index) => ({
  id: ++index,
  title: getRandomArrayElement(OFFERS_TITLES),
  price: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
});

const getOfferByType = () => ({
  type: getRandomArrayElement(POINTS_TYPES),
  offers: Array.from({ length: getRandomInteger(MIN_OFFERS, MAX_OFFERS) }, (value, index) => getOffer(index))
});

export {getOfferByType};
