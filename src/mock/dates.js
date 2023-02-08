import dayjs from 'dayjs';
import { getRandomInteger } from './util';

const TimeDuration = {
  DAY: 'day',
  HOUR: 'hour',
  MINUTE: 'minute'
};
const TimeRanges = {
  DAYS_MIN: 1,
  DAYS_MAX: 3,
  HOURS_MIN: 1,
  HOURS_MAX: 23,
  MINUTES_MIN: 1,
  MINUTES_MAX: 59
};

const getRandomDate = () =>
  dayjs().add(getRandomInteger(TimeRanges.DAYS_MIN, TimeRanges.DAYS_MAX), TimeDuration.DAY)
    .add(getRandomInteger(TimeRanges.HOURS_MIN, TimeRanges.HOURS_MAX), TimeDuration.HOUR)
    .add(getRandomInteger(TimeRanges.MINUTES_MIN, TimeRanges.MINUTES_MAX), TimeDuration.MINUTE);

const getRandomDates = () => {
  const date1 = getRandomDate();
  const date2 = getRandomDate();

  if (date2.isAfter(date1)) {
    return {
      dateFrom: date1.toISOString(),
      dateTo: date2.toISOString()
    };
  }
  return {
    dateFrom: date2.toISOString(),
    dateTo: date1.toISOString()
  };
};

export { getRandomDates };
