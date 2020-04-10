import {
  getString,
  setString,
  getNumber,
  setNumber,
} from 'tns-core-modules/application-settings';
import moment from 'moment';

const holidayKey = 'holidays';
const holidayDate = 'holidayDate';

export const fetchHolidays = async () => {
  const response = await fetch('https://envelope.app/endpoint/holidays.json');
  const { holidays } = await response.json();
  return holidays;
};
