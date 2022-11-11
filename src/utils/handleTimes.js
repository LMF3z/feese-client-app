import { formatInTimeZone } from 'date-fns-tz';

const getActualDate = () => {
  const date = new Date();
  return date;
};

const getActualDateFormat = () => {
  const newDate = new Date();
  return formatInTimeZone(newDate, 'America/Caracas', 'yyyy-MM-dd HH:mm:ssXXX');
};

export const convertDateToFormatLocalTime = (date) => {
  const newDate = new Date(date);
  return formatInTimeZone(newDate, 'America/Caracas', 'yyyy-MM-dd HH:mm:ssXXX');
};

export const converterDateToIso = (date) => new Date(date).toISOString();

export const converterDatePickerToFecha = (date) =>
  formatInTimeZone(date, 'America/Lima', 'yyyy-MM-dd HH:mm:ssXXX');

export const getOutFinalTimeToDate = (newDate) => {
  const date = newDate.split(' ')[0];
  const time = newDate.split(' ')[1];
  const timeFinal = time.split('-')[0];
  return date + ' ' + timeFinal;
};

export const getDateWithOutTime = (date) => date.split(' ')[0];

export const addAndRestDaysToDate = (date, days) => {
  const res = new Date(date);
  res.setDate(res.getDate() + days);
  // const newDate = res.toISOString().split('T')[0];
  return res;
};

const timeFunctions = { getActualDate, getActualDateFormat };

export default timeFunctions;
