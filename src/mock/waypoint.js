import { getRandomArrayElement, getRandomInt } from '../utils/utils.js';

const offersByTypes = [
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20
      },
      {
        id: 2,
        title: 'Choose radiostation',
        price: 5
      }
    ]
  },
  {
    type: 'bus',
    offers: []
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Choose seats',
        price: 50
      },
      {
        id: 2,
        title: 'Add meal',
        price: 20
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: 250
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Choose seats',
        price: 100
      },
      {
        id: 2,
        title: 'Add meal',
        price: 30
      },
      {
        id: 3,
        title: 'Vomiting pills',
        price: 10
      }
    ]
  },
  {
    type: 'restaurant',
    offers: []
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: 50
      },
      {
        id: 2,
        title: 'Lunch',
        price: 200
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: 50
      },
      {
        id: 2,
        title: 'Upgrade room',
        price: 500
      }
    ]
  }
];

const destinations = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Gen Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Geneve',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
        description: 'Gen Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. '
      }
    ]
  },
  {
    id: 3,
    description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
        description: 'Amst Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
      }
    ]
  }
];

const mockPoints = [
  {
    id: 0,
    type: 'check-in',
    offers: [1, 2],
    destination: 2,
    basePrice: 500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  },
  {
    id: 1,
    type: 'sightseeing',
    offers: [1, 2],
    destination: 1,
    basePrice: 200,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  },
  {
    id: 2,
    type: 'restaurant',
    offers: [],
    destination: 1,
    basePrice: 300,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  },
  {
    id: 3,
    type: 'taxi',
    offers: [1, 2],
    destination: 2,
    basePrice: 100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  },
  {
    id: 4,
    type: 'bus',
    offers: [],
    destination: 3,
    basePrice: 50,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  },
  {
    id: 5,
    type: 'train',
    offers: [1, 2],
    destination: 1,
    basePrice: 150,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  },
  {
    id: 6,
    type: 'ship',
    offers: [1, 2, 3],
    destination: 3,
    basePrice: 200,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  },
  {
    id: 7,
    type: 'drive',
    offers: [1],
    destination: 2,
    basePrice: 120,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  },
  {
    id: 8,
    type: 'flight',
    offers: [1, 2, 3],
    destination: 1,
    basePrice: 300,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  }
];

const getRandomPoint = () => (getRandomArrayElement(mockPoints));

export { mockPoints, destinations, offersByTypes, getRandomPoint };
