import dayjs from 'dayjs';

const DateSettings = {
  DATE_FORMAT: 'DD/MM/YY HH:mm',
  DATE_FORMAT_DATE_AND_MONTH: 'DD MMM',
  DATE_FORMAT_TIME: 'HH:mm'
};

const parseDate = (date) => dayjs(date);
const getDayAndMonth = (date) => parseDate(date).format(DateSettings.DATE_FORMAT_DATE_AND_MONTH);
const getTime = (date) => parseDate(date).format(DateSettings.DATE_FORMAT_TIME);
const getDate = (date) => parseDate(date).format(DateSettings.DATE_FORMAT);

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
