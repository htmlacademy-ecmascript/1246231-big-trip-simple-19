import { getRandomInteger, getRandomArrayElement } from './util.js';
import { DESCRIPTIONS, CITIES_NAMES} from './const.js';

const DescriptionsCount = {
  MIN: 1,
  MAX: 5
};
const Pictures = {
  MIN_RANDOM: 1,
  MAX_RANDOM: 50,
  MIN_COUNT: 2,
  MAX_COUNT: 6
};

const getRandomDestinationDescription = () => {
  const count = getRandomInteger(DescriptionsCount.MIN, DescriptionsCount.MAX);
  const descriptionsArr = [];
  for (let i = 0; i <= count; i++) {
    descriptionsArr.push(
      getRandomArrayElement(DESCRIPTIONS));
  }
  return descriptionsArr;
};

const getPicture = () => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInteger(Pictures.MIN_RANDOM, Pictures.MAX_RANDOM)}`,
  description: getRandomArrayElement(DESCRIPTIONS)
});

const getDestination = (index) =>({
  id: ++index,
  description: getRandomDestinationDescription(),
  name: getRandomArrayElement(CITIES_NAMES),
  pictures: Array.from({ length: getRandomInteger(Pictures.MIN_COUNT, Pictures.MAX_COUNT) }, getPicture)
});

export {getRandomDestinationDescription, getDestination};
