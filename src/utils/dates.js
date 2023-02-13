import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT_DATE_AND_MONTH = 'DD MMM';
const DATE_FORMAT_TIME = 'HH:mm';


const parseDate = (date) => dayjs(date);
const getDayAndMonth = (date) => parseDate(date).format(DATE_FORMAT_DATE_AND_MONTH);
const getTime = (date) => parseDate(date).format(DATE_FORMAT_TIME);
const getDate = (date) => parseDate(date).format(DATE_FORMAT);

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

const isStartDateExpired = (dateFrom) => dayjs(dateFrom).isAfter(dayjs());

const isEndDateExpired = (dateTo) => dayjs(dateTo).isAfter(dayjs());

const isFutureEvent = (dateFrom, dateTo) => isStartDateExpired(dateFrom) && isEndDateExpired(dateTo);

export {
  getDate,
  getDayAndMonth,
  getTime,
  isDatesEqual,
  isFutureEvent
};
